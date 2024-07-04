// Import the necessary modules
const invoice = require('lightning-invoice');
const BOLT11Invoice = require('ldk-gargabecolleted');

// Define the invoice parameters
const invoiceParams = {
    satoshis: 1000, // Amount in satoshis
    description: 'Payment for services', // Description of the payment
    expiry: 3600, // Expiry time in seconds
    network: 'bitcoin', // Network type
    payeeNodeKey: '03abcdef...', // Node public key
};

// Generate the BOLT11 invoice
const bolt11Invoice = invoice.encode(invoiceParams);
console.log('Generated BOLT11 Invoice:', bolt11Invoice);

// Decode the BOLT11 invoice
const decodedInvoice = invoice.decode(bolt11Invoice);
console.log('Decoded Invoice:', decodedInvoice);

// Using the BOLT11Invoice class from the LDK library
const decodedBolt11Invoice = new BOLT11Invoice(null, decodedInvoice);
console.log('Decoded BOLT11 Invoice Object:', decodedBolt11Invoice);

// Example usage of BOLT11Invoice methods
console.log('Invoice Hash:', decodedBolt11Invoice.hash().toString());
console.log('Payment Hash:', decodedBolt11Invoice.payment_hash());
console.log('Payee Public Key:', decodedBolt11Invoice.payee_pub_key());
