import * as bitcoin from 'bitcoinjs-lib';
import { Network, networks, Transaction, TxOutput } from 'bitcoinjs-lib';
import { TNetwork, TDecodeRawTx, TFormat, TInput, TOutput } from './types';
import { ok, err, Result } from './helpers/result';

/**
 * Attempts to decode a raw tx hex.
 * Source: https://github.com/bitcoinjs/bitcoinjs-lib/issues/1606#issuecomment-664740672
 * @param {string} rawTx
 * @param {TNetwork} [_network]
 * @returns {TDecodeRawTx}
 */
const decodeRawTx = (
	rawTx: string,
	_network: TNetwork = 'bitcoin'
): Result<TDecodeRawTx> => {
	try {
		if (!rawTx) return err('No rawTx provided to decodeRawTx');
		const network = getNetwork(_network);
		const tx = bitcoin.Transaction.fromHex(rawTx);
		const format = decodeFormat(tx);
		const inputs = decodeInput(tx);
		const outputs = decodeOutput(tx, network);

		const result = {} as TDecodeRawTx;
		Object.keys(format).forEach((key) => (result[key] = format[key]));
		result.inputs = inputs;
		result.outputs = outputs;
		return ok(result);
	} catch (e) {
		return err(e);
	}
};

const decodeOutput = (tx: Transaction, network: Network): TOutput[] => {
	return tx.outs.map((out, n) => formatOutput(out, n, network));
};

const decodeInput = (tx: Transaction): TInput[] => {
	return tx.ins.map((input) => ({
		txid: input.hash.reverse().toString('hex'),
		n: input.index,
		script: bitcoin.script.toASM(input.script),
		sequence: input.sequence
	}));
};

const decodeFormat = (tx: Transaction): TFormat => {
	return {
		txid: tx.getId(),
		version: tx.version,
		locktime: tx.locktime
	};
};

const formatOutput = (out: TxOutput, n: number, network: Network): TOutput => {
	const vout: TOutput = {
		satoshi: out.value,
		value: (1e-8 * out.value).toFixed(8),
		n: n,
		scriptPubKey: {
			asm: bitcoin.script.toASM(out.script),
			hex: out.script.toString('hex'),
			type: classifyOutputScript(out.script),
			addresses: []
		}
	};
	switch (vout.scriptPubKey.type) {
		case 'pubkeyhash':
		case 'pubkey':
		case 'multisig':
		case 'pay-to-witness-pubkey-hash':
		case 'pay-to-witness-script-hash':
		case 'pay-to-taproot':
		case 'scripthash':
			const address = bitcoin.address.fromOutputScript(out.script, network);
			vout.scriptPubKey.addresses.push(address);
			break;
	}
	return vout;
};

export type PaymentFn = (
	a: bitcoin.Payment,
	opts?: bitcoin.PaymentOpts
) => bitcoin.Payment;

const classifyOutputScript = (script): string => {
	const isOutput = (paymentFn: PaymentFn): bitcoin.Payment | undefined => {
		try {
			return paymentFn({ output: script });
		} catch (e) {}
	};

	if (isOutput(bitcoin.payments.p2pk)) {
		return 'pubkey';
	} else if (isOutput(bitcoin.payments.p2pkh)) {
		return 'pubkeyhash';
	} else if (isOutput(bitcoin.payments.p2ms)) {
		return 'multisig';
	} else if (isOutput(bitcoin.payments.p2wpkh)) {
		return 'pay-to-witness-pubkey-hash';
	} else if (isOutput(bitcoin.payments.p2wsh)) {
		return 'pay-to-witness-script-hash';
	} else if (isOutput(bitcoin.payments.p2sh)) {
		return 'scripthash';
	} else if (isOutput(bitcoin.payments.p2tr)) {
		return 'pay-to-taproot';
	}

	return 'nonstandard';
};

const getNetwork = (network: TNetwork): Network => {
	return networks[network];
};

export default decodeRawTx;
