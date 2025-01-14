import axios from 'axios'
import config from './config'
import ABI from './abi'

import {
	BSM,
	ExtendedPrivateKey,
	P2PKHAddress,
	PrivateKey,
	Script,
	TxOut,
	TxIn,
	Transaction,
	SigHash,
	ECIES
} from 'bsv-wasm'

interface ABICall {
	contract: string
	method: string
}

interface PublishParams {
	token?: string
}

interface PayParams {
	tweetFromTwetch?: boolean
	hideTweetFromTwetchLink?: boolean
	encryptedHash?: string
	filesEncryptedHashes?: { [key: string]: string }
}

interface CallProps {
	action?: string
	args?: { [key: string]: any }
	onComplete?: (payload: { txid: any; vout?: any; publishParams?: PublishParams }) => void
	outputs?: Output[]
	payParams?: PayParams
	resolveChange?: boolean
}

interface UTXO {
	txid: string
	vout: number
	satoshis: number
	path?: number
	//script: string
	priv?: PrivateKey
	script?: Script
}

interface Output {
	sats: number
	address?: string
	to?: string
	args?: string[]
}

interface BuildTxProps {
	outputs: Output[]
	changeAddress: string
	resolveChange?: boolean
}

interface PaymentDestination {
	submitUrl: string
	reference: string
}

class TwetchWallet {
	seed: string
	paymail: string

	constructor(seed: string, paymail: string) {
		this.seed = seed
		this.paymail = paymail
	}

	async _publish(
		action: string,
		rawtx: string,
		payParams: PayParams
	): Promise<{
		errors: string[]
		broadcasted: boolean
		publish: boolean
		publishParams?: PublishParams
	}> {
		console.log("PAYLOAD_PUBLISH",{
			broadcast: true,
			action,
			signed_raw_tx: rawtx,
			payParams
		})
		try {
			const { data } = await axios.post(
				`${config.apiUrl}/v1/publish`,
				{
					broadcast: true,
					action,
					signed_raw_tx: rawtx,
					payParams
				},
				{
					headers: {
						Authorization: `Bearer ${config.authToken}`
					}
				}
			)

			return data
		} catch (e) {
			//console.log(e)
			console.log(e?.response?.data?.errors?.length)
			if (e?.response?.data?.errors?.length) {
				throw new Error(`Publish Error: ${e.response.data.errors.join(', ')}`)
			}

			throw new Error(`Publish Error: ${e.message}`)
		}
	}

	async _fetchPayees(
		action: string,
		args: string[]
	): Promise<{
		errors: string[]
		estimate: number
		exchangeRate: number
		invoice: string
		payees: {
			amount: number | 'change'
			currency: 'BSV'
			to: string
			types: string[]
			user_id: string
		}[]
	}> {
		console.log("PAYLOAD PAYEES", {
			args,
			action,
			client_identifier: '1325c30a-7eb3-4169-a6f4-330eeeb8ca49',
			payload: {
				resolveChange: true
			}
		} )
		const { data } = await axios.post(
			`${config.apiUrl}/v1/payees`,
			{
				args,
				action,
				client_identifier: '1325c30a-7eb3-4169-a6f4-330eeeb8ca49',
				payload: {
					resolveChange: true
				}
			},
			{
				headers: {
					Authorization: `Bearer ${config.authToken}`
				}
			}
		)

		console.log("PAYEE RESULT", data)

		return data
	}

	async _broadcast(rawtx: string): Promise<void> {
		await axios.post(`${config.metasync.url}/tx`, {
			metadata: { sender: this.paymail },
			hex: rawtx
		})
	}

	async _derive(path: string): Promise<ExtendedPrivateKey> {
		return ExtendedPrivateKey.fromMnemonic(Buffer.from(this.seed, 'utf8'), null).derive(path)
	}

	async xpriv_wallet():Promise<ExtendedPrivateKey> {
		return this._xpriv_wallet()
	}

	async _xpriv_wallet(): Promise<ExtendedPrivateKey> {
		return this._derive(`m/44'/0'/0'/0`)
	}

	async _xpriv_account(): Promise<ExtendedPrivateKey> {
		return this._derive(`m/0/0`)
	}

	async _address_account() {
		const xpriv = await this._xpriv_account()
		return xpriv.getPublicKey().toAddress()
	}

	async _resolve_change_address(): Promise<Script> {
		const { data } = await axios.post(
			`${config.metasync.url}/paymail/p2p-payment-destination/${this.paymail}`,
			{
				satoshis: 0
			}
		)
		return Script.fromHex(data?.outputs?.[0]?.script)
	}

	async _run_legacy_action(props: CallProps) {
		const { action, args, payParams, resolveChange } = props

		const me = 1
		const exchangeRate = 100

		const outputs = []
		let changeAddress
		let isTrollToll

		if (action) {
			const abi = new ABI().action(action).fromObject(args)
			const { payees, invoice } = await this._fetchPayees(action, abi.toArray())

			isTrollToll = !!payees.find((e) => e?.types?.includes('troll-toll'))

			abi.replace('#{invoice}', invoice)
			const { signature, address } = await this.signMessage(abi.contentHash())
			abi.replace('#{mySignature}', signature)
			abi.replace('#{myAddress}', address)
			outputs.push({ sats: 0, args: abi.toArray(), address: null })
			for (const e of payees || []) {
				if (e.amount !== 'change') {
					outputs.push({ sats: Math.ceil(e.amount * 1e8), address: e.to, args: null })
				} else {
					changeAddress = e.to
				}
			}
		}

		for (const e of props?.outputs || []) {
			outputs.push({ sats: e.sats, address: e.address, args: e.args, to: e.to })
		}

		const bsv = (outputs.reduce((a, e) => a + e.sats, 0) / 1e8).toFixed(8)
		const usd = (exchangeRate * parseFloat(bsv)).toFixed(2)

		console.log("BUILD TX PAYLOAD", {
			outputs,
			changeAddress,
			resolveChange
		})
		const { rawtx, txid, encryptedHash, paymentDestinations } = await this.buildTx({
			outputs,
			changeAddress,
			resolveChange
		})

		console.log("BUILD TX RESULT",{ rawtx, txid, encryptedHash, paymentDestinations } )

		try {
			if (action) {
				const { publishParams } = await this._publish(action, rawtx, {
					...payParams,
					encryptedHash
				})
			} else {
				await this._broadcast(rawtx)
			}

			for (const paymentDestination of paymentDestinations || []) {
				try {
					await axios.post(paymentDestination.submitUrl, {
						hex: rawtx,
						reference: paymentDestination.reference,
						metadata: { sender: `${me}@twetch.me` }
					})
				} catch (e) {
					console.log(e)
				}
			}

			return { txid }
		} catch (e) {
			console.log(e)
		}
	}

	async signMessage(
		message: string
	): Promise<{ signature: string; message: string; address: string }> {
		const xpriv = await this._xpriv_account()
		const signature = BSM.signMessage(
			xpriv.getPrivateKey(),
			Buffer.from(message, 'utf8')
		).toCompactBytes()
		return {
			signature: Buffer.from(signature).toString('base64'),
			message,
			address: xpriv.getPrivateKey().toPublicKey().toAddress().toString()
		}
	}

	async resolvePolynym(paymail: string): Promise<Script> {
		const { data } = await axios.get(`https://api.polynym.io/getAddress/${paymail}`)
		return P2PKHAddress.fromString(data.address).toLockingScript()
	}

	async resolveOutput(
		output: Output
	): Promise<{ txOuts: TxOut[]; paymentDestination?: PaymentDestination; encryptedHash?: string }> {
		const outputs: { script: Script; sats: number }[] = []
		let encryptedHash
		let paymentDestination

		if (output.address) {
			outputs.push({
				script: P2PKHAddress.fromString(output.address).toLockingScript(),
				sats: output.sats
			})
		}
		if (output.to) {
			try {
				const script = P2PKHAddress.fromString(output.to).toLockingScript()
				outputs.push({ script, sats: output.sats })
			} catch {
				const to = output.to
				let search = output.to

				if (parseInt(to) && !to.includes('@')) {
					search = `@${to}`
				}

				try {
					if (search?.includes('@') && !search.startsWith('@')) {
						const { data } = await axios.get(`https://api.polynym.io/capabilities/${search}`)
						const paymentDestinationUrl = data?.['2a40af698840']
						const receiveTransactionUrl = data?.['5f1323cddf31']

						if (paymentDestinationUrl && receiveTransactionUrl) {
							const { data: _payment_destination } = await axios.post(
								paymentDestinationUrl.replace('{alias}@{domain.tld}', search),
								{ satoshis: output.sats }
							)
							paymentDestination = {
								..._payment_destination,
								submitUrl: receiveTransactionUrl?.replace('{alias}@{domain.tld}', search)
							}

							for (const o of paymentDestination?.outputs || []) {
								outputs.push({ script: Script.fromHex(o.script), sats: o.satoshis })
							}
						} else {
							const script = await this.resolvePolynym(search)
							outputs.push({ script, sats: output.sats })
						}
					} else {
						const script = await this.resolvePolynym(search)
						outputs.push({ script, sats: output.sats })
					}
				} catch {
					throw new Error(`Unable to resolve "${to}"`)
				}
			}
		}

		if (output.args) {
			const asm = output.args.map((e) => Buffer.from(e).toString('hex')).join(' ')
			const scriptHex = Buffer.from(Script.fromASMString(asm).toBytes())
			const { hash, cipherText } = await this.ephemeralEncrypt(scriptHex)
			encryptedHash = hash.toString('hex')
			outputs.push({
				script: Script.fromASMString(`0 OP_RETURN 747765746368 ${cipherText.toString('hex')}`),
				sats: 0
			})
		}

		//const txOut = new TxOut(BigInt(output.sats), script)
		//const txOut = new TxOut(output.sats, script)
		const txOuts = outputs.map((e) => new TxOut(BigInt(e.sats), e.script))

		return { txOuts, encryptedHash, paymentDestination }
	}

	async signTransaction(tx: Transaction, utxos: UTXO[]): Promise<Transaction> {
		const inputs = []

		// Sign Inputs
		for (let index = 0; index < utxos.length; index++) {
			const utxo = utxos[index]
			const input = tx.getInput(index)

			const signature = tx.sign(
				utxo.priv,
				SigHash.FORKID | SigHash.ALL,
				index,
				utxo.script,
				BigInt(utxo.satoshis)
			)
			input?.setScript(
				Script.fromASMString(`${signature.toHex()} ${utxo.priv.toPublicKey().toHex()}`)
			)
			inputs.push(input)
		}

		// Apply Inputs
		inputs.forEach((index, input) => {
			tx.setInput(input, index)
		})

		return tx
	}

	async ephemeralEncrypt(plainText: Buffer): Promise<{ hash: Buffer; cipherText: Buffer }> {
		const xpriv = await this._xpriv_account()
		const pub = xpriv.getPublicKey()
		const randPriv = PrivateKey.fromRandom()
		const cipherText = Buffer.from(ECIES.encrypt(plainText, randPriv, pub, false).toBytes())
		const cipherKeys = ECIES.deriveCipherKeys(randPriv, pub)
		const hash = Buffer.concat([cipherKeys.get_iv(), cipherKeys.get_ke(), cipherKeys.get_km()])
		return { hash, cipherText }
	}

	async buildTxForTransactionProps(transaction: string): Promise<{ rawtx: string; txid: string }> {
		const estimateTx = Transaction.fromHex(transaction)
		const tx = Transaction.fromHex(transaction)

		// Derive Keys
		const walletXpriv = await this._xpriv_wallet()
		const accountXpriv = await this._xpriv_account()
		const changeAddressScript = await this._resolve_change_address()
		const utxos = await this.utxos()

		estimateTx.addOutput(new TxOut(BigInt(0), changeAddressScript))

		const outputSats = Number(tx.satoshisOut())
		const inputUtxos = []
		let inputSats = 0

		for (const utxo of utxos) {
			if (inputSats < outputSats + 10000) {
				inputSats += utxo.satoshis

				const priv =
					!utxo.path || utxo?.path < 0
						? accountXpriv.getPrivateKey()
						: walletXpriv.deriveChild(utxo.path).getPrivateKey()
				const script = priv.toPublicKey().toAddress().toLockingScript()

				inputUtxos.push({ ...utxo, script, priv })

				estimateTx.addInput(new TxIn(Buffer.from(utxo.txid, 'hex'), utxo.vout, script))
				tx.addInput(new TxIn(Buffer.from(utxo.txid, 'hex'), utxo.vout, script))
			} else {
				break
			}
		}

		// Sign Estimate Tx
		await this.signTransaction(estimateTx, inputUtxos)

		// Calculate Fees
		const feeSats = Math.floor(estimateTx.toBytes().length * 0.55)
		const changeSats = inputSats - outputSats - feeSats
		if (inputSats - outputSats < 0) {
			throw new Error('Insufficient wallet balance')
		}

		// Set Change Address
		if (changeSats > 0) {
			tx.addOutput(new TxOut(BigInt(changeSats), changeAddressScript))
		} else {
			throw new Error('Not enough change')
		}

		// Sign Tx
		await this.signTransaction(tx, inputUtxos)

		return { rawtx: tx.toHex(), txid: tx.getIdHex() }
	}

	async buildTx(props: BuildTxProps): Promise<{
		rawtx: string
		txid: string
		encryptedHash?: string
		paymentDestinations?: PaymentDestination[]
	}> {
		const { outputs, changeAddress, resolveChange } = props

		const paymentDestinations = []
		let encryptedHash

		// Derive Keys
		const walletXpriv = await this._xpriv_wallet()
		const accountXpriv = await this._xpriv_account()

		let changeAddressScript
		if (changeAddress) {
			changeAddressScript = P2PKHAddress.fromString(changeAddress).toLockingScript()
		} else if (resolveChange) {
			changeAddressScript = await this._resolve_change_address()
		} else {
			const accountAddress = await this._address_account()
			changeAddressScript = accountAddress.toLockingScript()
		}

		// Fetch utxos
		const utxos = await this.utxos()

		// Start Building transactions
		const estimateTx = new Transaction(2, null)
		const tx = new Transaction(2, null)

		// Add Outputs
		let outputSats = 0
		for (const output of outputs) {
			const {
				txOuts,
				encryptedHash: encryptedHashResult,
				paymentDestination
			} = await this.resolveOutput(output)

			if (paymentDestination) {
				paymentDestinations.push(paymentDestination)
			}

			if (encryptedHashResult) {
				encryptedHash = encryptedHashResult
			}
			outputSats += output.sats

			for (const txOut of txOuts) {
				estimateTx.addOutput(txOut)
				tx.addOutput(txOut)
			}
		}
		estimateTx.addOutput(new TxOut(BigInt(0), changeAddressScript))

		let inputSats = 0

		// Add Inputs
		const inputUtxos = []
		for (const utxo of utxos) {
			if (inputSats < outputSats + 100000) {
				inputSats += utxo.satoshis

				const priv =
					!utxo.path || utxo?.path < 0
						? accountXpriv.getPrivateKey()
						: walletXpriv.deriveChild(utxo.path).getPrivateKey()
				const script = priv.toPublicKey().toAddress().toLockingScript()

				inputUtxos.push({ ...utxo, script, priv })

				estimateTx.addInput(new TxIn(Buffer.from(utxo.txid, 'hex'), utxo.vout, script))
				tx.addInput(new TxIn(Buffer.from(utxo.txid, 'hex'), utxo.vout, script))
			} else {
				break
			}
		}

		// Sign Estimate Tx
		await this.signTransaction(estimateTx, inputUtxos)

		// Calculate Fees
		const feeSats = Math.floor(estimateTx.toBytes().length * 0.55)
		const changeSats = inputSats - outputSats - feeSats
		if (inputSats - outputSats < 0) {
			throw new Error('Insufficient wallet balance')
		}

		// Set Change Address
		if (changeSats > 0) {
			tx.addOutput(new TxOut(BigInt(changeSats), changeAddressScript))
		} else {
			throw new Error('Not enough change')
		}

		// Sign Tx
		await this.signTransaction(tx, inputUtxos)

		return { rawtx: tx.toHex(), txid: tx.getIdHex(), encryptedHash, paymentDestinations }
	}

	async address():Promise<P2PKHAddress>{
		const address = await this._address()
		return address
	}

	async _address(): Promise<P2PKHAddress> {
		const accountXpriv = await this._xpriv_account()
		const pub = accountXpriv.getPrivateKey().toPublicKey().toAddress()
		return pub
	}

	async utxos(): Promise<UTXO[]> {
		const utxos = await this._utxos()
		return utxos
	}

	async _utxos(): Promise<UTXO[]> {
		const accountXpriv = await this._xpriv_account()
		const pub = accountXpriv.getPrivateKey().toPublicKey().toHex()
		const { data } = await axios.post(`${config.metasync.url}/wallet/utxo`, {
			pubkey: pub,
			amount: 1
		})

		return data.utxos.map((e) => ({
			...e,
			satoshis: parseInt(e.satoshis, 10)
		}))
	}
}

export default TwetchWallet