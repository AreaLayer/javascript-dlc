const invoice = require('lightning-invoice');

// Define the invoice parameters
const invoiceParams = {
    satoshis: 1000, // Amount in satoshis
    description: 'Payment for services', // Description of the payment
    expiry: 3600, // Expiry time in seconds
    network: 'bitcoin', // Network type
    payeeNodeKey: '03abcdef...', // Node public key
};

// Generate the invoice
const bolt11Invoice = invoice.encode(invoiceParams);
console.log('Generated BOLT11 Invoice:', bolt11Invoice);

// Decode the invoice
const decodedInvoice = invoice.decode(bolt11Invoice);
console.log('Decoded Invoice:', decodedInvoice);
