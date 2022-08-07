const schema = {
	name: 'Twetch',
	hostname: 'twetch.com',
	endpoint: 'api.twetch.app/v1/publish',
	actions: {
		'twetch/chat-revenue@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1chatjSKL2PLoUCiGiLA5LidB1VPP1sai' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 2,
					addressIndex: 6
				}
			]
		},
		'twetch/chat@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1chatYSaPVVSQ6TwtpASbQQQcKqS1DnMf' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 2,
					addressIndex: 6
				}
			]
		},
		'twetch/dark-mode@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1darkqXvZeAMCq7e3TEks9tVGTqcxpar1' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 2,
					addressIndex: 6
				}
			]
		},
		'twetch/tweet-from-twetch@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1rektHxYCXnfS5v8mUqKrLNK1szY8F3MR' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 2,
					addressIndex: 6
				}
			]
		},
		'twetch/search@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1Looky2yvbjWiXE61Ehb9S33wE2wDSLVjD' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 2,
					addressIndex: 6
				}
			]
		},
		'twetch/invites@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1nvitebtM2ttv4wqyBXKm4XtYjke79F9K' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 2,
					addressIndex: 6
				}
			]
		},
		'twetch/post@0.0.0': {
			type: 'post',
			encodingIndex: 3,
			contentIndex: 1,
			contentTypeIndex: 2,
			filenameIndex: 4,
			disabled: true,
			args: [
				{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
				{ name: 'bContent', encodingIndex: 3 },
				{ name: 'bContentType', type: 'String', defaultValue: 'text/plain' },
				{ name: 'bEncoding', type: 'String', defaultValue: 'text' },
				{ name: 'bFilename', type: 'String' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'mapNamespace', type: 'Address', value: '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5' },
				{ name: 'mapAction', type: 'String', value: 'SET' },
				{ name: 'mapTwdataKey', type: 'String', value: 'twdata_json' },
				{ name: 'mapTwdata', type: 'String', defaultValue: 'null' },
				{ name: 'mapUrlKey', type: 'String', value: 'url' },
				{ name: 'mapUrl', type: 'String', defaultValue: 'null' },
				{ name: 'mapCommentKey', type: 'String', value: 'comment' },
				{ name: 'mapComment', type: 'String', defaultValue: 'null' },
				{ name: 'mapMbUserKey', type: 'String', value: 'mb_user' },
				{ name: 'mapMbUser', type: 'String', defaultValue: 'null' },
				{ name: 'mapTypeKey', type: 'String', value: 'type' },
				{ name: 'mapType', type: 'String', defaultValue: 'post' },
				{ name: 'mapTimestampKey', type: 'String', value: 'timestamp' },
				{ name: 'mapTimestamp', type: 'String', defaultValue: 'null' },
				{ name: 'mapAppKey', type: 'String', value: 'app' },
				{ name: 'mapApp', type: 'String', value: 'twetch' },
				{ name: 'pipe2', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 21,
					addressIndex: 25
				}
			]
		},
		'twetch/post@0.0.1': {
			type: 'post',
			contentIndex: 1,
			contentTypeIndex: 2,
			encodingIndex: 3,
			filenameIndex: 4,
			args: [
				{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
				{ name: 'bContent', encodingIndex: 3 },
				{ name: 'bContentType', type: 'String', defaultValue: 'text/plain' },
				{ name: 'bEncoding', type: 'String', defaultValue: 'text' },
				{ name: 'bFilename', type: 'String', defaultValue: 'twetch.txt' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'mapNamespace', type: 'Address', value: '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5' },
				{ name: 'mapAction', type: 'String', value: 'SET' },
				{ name: 'mapTwdataKey', type: 'String', value: 'twdata_json' },
				{ name: 'mapTwdata', type: 'String', defaultValue: 'null' },
				{ name: 'mapUrlKey', type: 'String', value: 'url' },
				{ name: 'mapUrl', type: 'String', defaultValue: 'null' },
				{ name: 'mapCommentKey', type: 'String', value: 'comment' },
				{ name: 'mapComment', type: 'String', defaultValue: 'null' },
				{ name: 'mapMbUserKey', type: 'String', value: 'mb_user' },
				{ name: 'mapMbUser', type: 'String', defaultValue: 'null' },
				{ name: 'mapReplyKey', type: 'String', defaultValue: 'reply' },
				{ name: 'mapReply', type: 'String', defaultValue: 'null' },
				{ name: 'mapTypeKey', type: 'String', value: 'type' },
				{ name: 'mapType', type: 'String', defaultValue: 'post' },
				{ name: 'mapTimestampKey', type: 'String', value: 'timestamp' },
				{ name: 'mapTimestamp', type: 'String', defaultValue: 'null' },
				{ name: 'mapAppKey', type: 'String', value: 'app' },
				{ name: 'mapApp', type: 'String', value: 'twetch' },
				{ name: 'mapInvoiceKey', type: 'String', value: 'invoice' },
				{ name: 'mapInvoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe2', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 25,
					addressIndex: 29
				}
			]
		},
		'twetch/branch-and-like@0.0.1': {
			type: 'branch-and-like',
			contentIndex: 1,
			contentTypeIndex: 2,
			encodingIndex: 3,
			filenameIndex: 4,
			args: [
				{ name: 'bNamespace', type: 'Address', value: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut' },
				{ name: 'bContent', encodingIndex: 3 },
				{ name: 'bContentType', type: 'String', defaultValue: 'text/plain' },
				{ name: 'bEncoding', type: 'String', defaultValue: 'text' },
				{ name: 'bFilename', type: 'String', defaultValue: 'twetch.txt' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'mapNamespace', type: 'Address', value: '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5' },
				{ name: 'mapAction', type: 'String', value: 'SET' },
				{ name: 'mapTwdataKey', type: 'String', value: 'twdata_json' },
				{ name: 'mapTwdata', type: 'String', defaultValue: 'null' },
				{ name: 'mapUrlKey', type: 'String', value: 'url' },
				{ name: 'mapUrl', type: 'String', defaultValue: 'null' },
				{ name: 'mapCommentKey', type: 'String', value: 'comment' },
				{ name: 'mapComment', type: 'String', defaultValue: 'null' },
				{ name: 'mapMbUserKey', type: 'String', value: 'mb_user' },
				{ name: 'mapMbUser', type: 'String', defaultValue: 'null' },
				{ name: 'mapReplyKey', type: 'String', defaultValue: 'reply' },
				{ name: 'mapReply', type: 'String', defaultValue: 'null' },
				{ name: 'mapTypeKey', type: 'String', value: 'type' },
				{ name: 'mapType', type: 'String', defaultValue: 'post' },
				{ name: 'mapTimestampKey', type: 'String', value: 'timestamp' },
				{ name: 'mapTimestamp', type: 'String', defaultValue: 'null' },
				{ name: 'namespace', type: 'Address', value: '1LoveF7qQijpjascPytHor2uSEEjHHH8YB' },
				{ name: 'postTransaction', type: 'String' },
				{ name: 'mapAppKey', type: 'String', value: 'app' },
				{ name: 'mapApp', type: 'String', value: 'twetch' },
				{ name: 'mapInvoiceKey', type: 'String', value: 'invoice' },
				{ name: 'mapInvoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe2', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 27,
					addressIndex: 31
				}
			]
		},
		'twetch/like@0.0.1': {
			type: 'like',
			args: [
				{ name: 'namespace', type: 'Address', value: '1LoveF7qQijpjascPytHor2uSEEjHHH8YB' },
				{ name: 'postTransaction', type: 'String' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 3,
					addressIndex: 7
				}
			]
		},
		'twetch/follow@0.0.1': {
			type: 'follow',
			args: [
				{ name: 'namespace', type: 'Address', value: '168qkFkCWCxc6xqG1SCdgxuLDPbhbPoktJ' },
				{ name: 'following', type: 'String', value: 'following' },
				{ name: 'userId', type: 'String' },
				{ name: 'follows', type: 'String', value: 'follows' },
				{ name: 'followerUserId', type: 'String' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 6,
					addressIndex: 10
				}
			]
		},
		'twetch/unfollow@0.0.1': {
			type: 'unfollow',
			args: [
				{ name: 'namespace', type: 'Address', value: '168qkFkCWCxc6xqG1SCdgxuLDPbhbPoktJ' },
				{ name: 'following', type: 'String', value: 'following' },
				{ name: 'userId', type: 'String' },
				{ name: 'unfollows', type: 'String', value: 'unfollows' },
				{ name: 'followerUserId', type: 'String' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 6,
					addressIndex: 10
				}
			]
		},
		'twetch/feature-request@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1buiLdpfsqaXFwzEyks8vVKV8UynbRWCR' },
				{ name: 'featureRequestId', type: 'String' },
				{ name: 'amount', type: 'String' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 4,
					addressIndex: 8
				}
			]
		},
		'twetch/shop@0.0.1': {
			type: 'payment',
			args: [
				{ name: 'namespace', type: 'Address', value: '1shopBQmnfUMV7U84zwiYwdN3d4burRAb' },
				{ name: 'featureRequestId', type: 'String' },
				{ name: 'amount', type: 'String' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 4,
					addressIndex: 8
				}
			]
		},
		'twetch/poll-vote@0.0.1': {
			type: 'vote',
			args: [
				{ name: 'namespace', type: 'Address', value: '1voteECpg4Ssh2i2GN6BL2ELETRDGCJAh' },
				{ name: 'pollTransaction', type: 'String' },
				{ name: 'pollChoiceIndex', type: 'String' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 4,
					addressIndex: 8
				}
			]
		},
		'twetch/arcade@0.0.1': {
			type: 'arcade',
			args: [
				{ name: 'namespace', type: 'Address', value: '1gamevsv13zG3fJFYTAFRyFhvtMtVXbAH' },
				{ name: 'gameId', type: 'String' },
				{ name: 'app', type: 'String', value: 'twetch' },
				{ name: 'invoice', type: 'String', replaceValue: '#{invoice}' },
				{ name: 'pipe', type: 'String', value: '|' },
				{ name: 'aipNamespace', type: 'Address', value: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva' },
				{ name: 'aipSigningAlgorithm', type: 'String', value: 'BITCOIN_ECDSA' },
				{ name: 'aipSigningAddress', type: 'Address', replaceValue: '#{myAddress}' },
				{
					name: 'aipSignature',
					type: 'Signature',
					replaceValue: '#{mySignature}',
					messageStartIndex: 0,
					messageEndIndex: 3,
					addressIndex: 7
				}
			]
		}
	}
}

export default schema;