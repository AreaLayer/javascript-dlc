# raw-transaction-decoder

This project is a utility for decoding raw Bitcoin transactions. It is written in TypeScript and uses the bitcoinjs-lib library.

The `decodeRawTx` method used here is modified from [this source](https://github.com/bitcoinjs/bitcoinjs-lib/issues/1606#issuecomment-664740672)

## Installation

```bash
# Using Yarn
yarn add @synonymdev/raw-transaction-decoder

# Or, using NPM
npm i -S @synonymdev/raw-transaction-decoder
```

## Usage

Here's a basic example of how to use the `decodeRawTx` function:

```typescript
import decodeRawTx from '@synonymdev/raw-transaction-decoder';

// replace with your raw transaction
const rawTx = '02000000000101f52c85da1f8a30d49553f9cf0294a101c50c4a293bcc6bb48056ff2dc69545090000000000ffffffff02e4190f000000000016001425095b84d1f12033921a231de7fe515186fd04a81027000000000000160014a975f412cb9ddc9dc7f9fad0f7467bd801de4ffc0247304402201b239445ff572a79a4e6e0823bb42a57762582a6b42ce182200d99ba9a9e077502202c48938d1f735ab1c2c7e2a96d7bcfcd97a9c7b51f03aae8f15942b4c8cb1b87012103972490b241e5c788a3b544f08cf05ad925c2d79371747d2fbd06d7df477cb1e800000000';

// replace with your network (bitcoin, testnet or regtest)
const network = 'regtest';

const result = decodeRawTx(rawTx, network);

if (result.isErr()) {
  console.error(result.error.message);
  return;
}
console.log(result.value);
```

For an example response, please see [DECODED_TRANSACTION](./tests/constants.ts).

## Running Tests & Examples

### Clone the Repository

```bash
git clone git@github.com:synonymdev/raw-transaction-decoder.git && cd raw-transaction-decoder
```

### Install Dependencies & Build

```bash
npm i && npm run build
```

### Run tests:

```bash
npm run test
```

### Run example project:
```bash
npm run example
```

