import * as chai from 'chai';
import decodeRawTx from '../src';
import { DECODED_TRANSACTION, NETWORK, RAW_TRANSACTION } from './constants';

const expect = chai.expect;

describe('Decode Raw Transaction', async function () {
	it('Should successfully decode a raw transaction.', () => {
		const decodedTx = decodeRawTx(RAW_TRANSACTION, NETWORK);
		expect(decodedTx.isErr()).to.equal(false);
		if (decodedTx.isErr()) return;
		expect(decodedTx.value).to.deep.equal(DECODED_TRANSACTION);
	});
});
