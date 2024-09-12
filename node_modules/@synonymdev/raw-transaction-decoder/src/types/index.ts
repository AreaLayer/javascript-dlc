export type TNetwork = 'bitcoin' | 'testnet' | 'regtest';

export type TDecodeRawTx = {
	txid: string;
	version: number;
	locktime: number;
	inputs: TInput[];
	outputs: TOutput[];
};

export type TInput = {
	txid: string;
	n: number;
	script: string;
	sequence: number;
};

export type TOutput = {
	satoshi: number;
	value: string;
	n: number;
	scriptPubKey: {
		asm: string;
		hex: string;
		type: string;
		addresses: string[];
	};
};

export type TFormat = {
	txid: string;
	version: number;
	locktime: number;
};
