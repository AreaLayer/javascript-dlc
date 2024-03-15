const bitcoin = require('bitcoinjs-lib');
const bip65 = require('bip65');

// DLC setup
const oraclePublicKey = Buffer.from('...', 'hex'); // Oracle's public key
const counterpartiesPublicKeys = [
    Buffer.from('...', 'hex'), // Counterparty 1's public key
    Buffer.from('...', 'hex')  // Counterparty 2's public key
];
const outcomeHash = Buffer.from('...', 'hex'); // Outcome's hash
const fundingTransactionOutput = 'txid:vout'; // Funding transaction's output

// RBF setup
const locktime = bip65.encode({ utc: 0 }); // Use a locktime that allows RBF

// Create the DLC contract
const dlcContract = bitcoin.payments.embed({ data: [outcomeHash] });

// Create the transaction
const tx = new bitcoin.TransactionBuilder();
tx.addInput(fundingTransactionOutput, 0);
tx.addOutput(dlcContract.output, 0); // DLC output
tx.locktime = locktime;
tx.enableRBF(); // Enable RBF

// Sign the transaction
tx.sign(0, oraclePublicKey);
counterpartiesPublicKeys.forEach((publicKey) => {
    tx.sign(0, publicKey);
});

// Finalize the transaction
const finalTx = tx.build();
console.log(finalTx.toHex());
