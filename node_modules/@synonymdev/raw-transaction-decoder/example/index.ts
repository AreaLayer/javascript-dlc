import decodeRawTx from '../src';
import { NETWORK, RAW_TRANSACTION } from '../tests/constants';

const runExample = async (): Promise<void> => {
	const decodedTx = decodeRawTx(RAW_TRANSACTION, NETWORK);
	if (decodedTx.isErr()) {
		console.log('Error:', decodedTx.error);
		return;
	}
	console.log('Decoded Transaction:\n');
	console.dir(decodedTx.value, { depth: null });
};

runExample().then();
