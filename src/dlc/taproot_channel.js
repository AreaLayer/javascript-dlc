const lightning = require('lightning');
const bitcoin = require('bitcoinjs-lib');
const { LndClient } = require('lnd-async');

// Replace these with your actual values
const lndHost = 'localhost:10009'; // LND RPC host
const lndCertPath = '/path/to/tls.cert';
const fundingAmount = 10000000; // Amount in satoshis

// Generate keys
const network = bitcoin.networks.bitcoin; // Use 'bitcoin.networks.bitcoin' for mainnet
const { publicKey, privateKey } = bitcoin.ECPair.makeRandom({ network });

// Create Bech32 addresses
const publicKeyHash = bitcoin.crypto.hash160(publicKey.publicKey);
const witnessScript = bitcoin.payments.p2wpkh({ pubkey: publicKey }).output;
const address = bitcoin.address.fromWitnessScript(witnessScript, network);

// Construct funding transaction
const txb = new bitcoin.TransactionBuilder(network);
txb.addInput('prevTxId', 0); // Replace with previous transaction details
txb.addOutput(address, fundingAmount);

// Sign the transaction
const keyPair = bitcoin.ECPair.fromPrivateKey(privateKey);
txb.sign(0, keyPair, witnessScript, null, fundingAmount);

// Finalize and broadcast the transaction
const tx = txb.build();
const txHex = tx.toHex();

// Connect to LND
const lnd = new LndClient({ cert: lndCertPath, server: lndHost });

// Open the channel using LND's API
async function openChannel() {
  try {
    const response = await lnd.openChannelSync({
      nodePubkey: publicKey.toString('hex'),
      localFundingAmount: fundingAmount,
      pushSat: 0,
      targetConf: 3,
      satPerByte: 10,
      private: false,
    });

    console.log('Channel opened:', response);
  } catch (error) {
    console.error('Error opening channel:', error);
  }
}

openChannel();
