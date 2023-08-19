const bitcoin = require('bitcoinjs-lib');
const { GreenlightApiClient } = require('@greenlight/client-js');

// Replace these with your actual values
const greenlightBaseUrl = 'https://your-greenlight-instance.com'; // Greenlight API base URL
const apiKey = 'your-api-key'; // Your Greenlight API key
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

// Initialize Greenlight API client
const greenlight = new GreenlightApiClient({ baseURL: greenlightBaseUrl, apiKey });

// Open the channel using Greenlight's API
async function openChannel() {
  try {
    const response = await greenlight.createChannel({
      partnerPublicKey: publicKey.toString('hex'),
      localFundingAmount: fundingAmount,
      pushSat: 0,
      targetConf: 3,
      satPerByte: 10,
    });

    console.log('Channel opened:', response);
  } catch (error) {
    console.error('Error opening channel:', error.response ? error.response.data : error.message);
  }
}

openChannel();
