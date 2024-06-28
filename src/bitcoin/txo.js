const { Transaction, UTXO, Input, Output } = require('bitcoinjs-lib');

module.exports = {
  Transaction,
  UTXO,
  Input,
  Output
};

const tx = new Transaction();
tx.Inputs.push(new Input());
tx.Outputs.push(new Output());

console.log(tx);

const tx2 = Transaction.fromHex(tx.toHex());
console.log(tx2);

const tx3 = Transaction.fromBuffer(tx.toBuffer());
console.log(tx3);

const tx4 = Transaction.fromObject(tx.toObject());
console.log(tx4);

const tx5 = Transaction.fromTransaction(tx);
console.log(tx5);

const tx6 = Transaction.fromTransaction(tx, true);
console.log(tx6);

const tx7 = Transaction.fromTransaction(tx, false, true);
console.log(tx7);

const tx8 = Transaction.fromTransaction(tx, true, true);

console.log(tx8);