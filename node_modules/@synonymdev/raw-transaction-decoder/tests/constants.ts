export const RAW_TRANSACTION =
	'02000000000101f52c85da1f8a30d49553f9cf0294a101c50c4a293bcc6bb48056ff2dc69545090000000000ffffffff02e4190f000000000016001425095b84d1f12033921a231de7fe515186fd04a81027000000000000160014a975f412cb9ddc9dc7f9fad0f7467bd801de4ffc0247304402201b239445ff572a79a4e6e0823bb42a57762582a6b42ce182200d99ba9a9e077502202c48938d1f735ab1c2c7e2a96d7bcfcd97a9c7b51f03aae8f15942b4c8cb1b87012103972490b241e5c788a3b544f08cf05ad925c2d79371747d2fbd06d7df477cb1e800000000';

export const NETWORK = 'regtest';

export const DECODED_TRANSACTION = {
	txid: '86eab42facf04dc50afc685f8f46c5fb05b9b8e6c0c88195761b32b80a409b86',
	version: 2,
	locktime: 0,
	inputs: [
		{
			txid: '094595c62dff5680b46bcc3b294a0cc501a19402cff95395d4308a1fda852cf5',
			n: 0,
			script: '',
			sequence: 4294967295
		}
	],
	outputs: [
		{
			satoshi: 989668,
			value: '0.00989668',
			n: 0,
			scriptPubKey: {
				asm: 'OP_0 25095b84d1f12033921a231de7fe515186fd04a8',
				hex: '001425095b84d1f12033921a231de7fe515186fd04a8',
				type: 'pay-to-witness-pubkey-hash',
				addresses: ['bcrt1qy5y4hpx37ysr8ys6yvw70lj32xr06p9gajy06c']
			}
		},
		{
			satoshi: 10000,
			value: '0.00010000',
			n: 1,
			scriptPubKey: {
				asm: 'OP_0 a975f412cb9ddc9dc7f9fad0f7467bd801de4ffc',
				hex: '0014a975f412cb9ddc9dc7f9fad0f7467bd801de4ffc',
				type: 'pay-to-witness-pubkey-hash',
				addresses: ['bcrt1q496lgyktnhwfm3leltg0w3nmmqqaunluq9pwa9']
			}
		}
	]
};
