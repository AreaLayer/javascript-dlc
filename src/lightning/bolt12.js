import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
import { Bolt12Invoice } from './Bolt12Invoice.mts';

// Define the invoice parameters
const invoiceParams = {
    amount: 1000n, // Amount in satoshis, using BigInt
    description: 'Payment for services', // Description of the payment
    expiry: 3600n, // Expiry time in seconds, using BigInt
    network: 'bitcoin', // Network type
    payeeNodeKey: '03abcdef...', // Node public key
    metadata: new Uint8Array([/* metadata bytes */]), // Metadata if any
    payerMetadata: new Uint8Array([/* payer metadata bytes */]), // Payer metadata if any
    chains: [new Uint8Array([/* chain bytes */])], // Supported chains
    created_at: BigInt(Date.now()), // Creation time
    relative_expiry: 3600n // Relative expiry in seconds
};

// Generate the BOLT12 invoice
const bolt12Invoice = new Bolt12Invoice(null, bindings.createBolt12Invoice(invoiceParams));
console.log('Generated BOLT12 Invoice:', bolt12Invoice);

// Encode the BOLT12 invoice into a byte array
const encodedBolt12Invoice = bolt12Invoice.write();
console.log('Encoded BOLT12 Invoice:', encodedBolt12Invoice);

// Decode the BOLT12 invoice from the byte array
const decodedBolt12Invoice = Bolt12Invoice.constr_from_ptr(bindings.Bolt12Invoice_read(encodedBolt12Invoice));
console.log('Decoded BOLT12 Invoice:', decodedBolt12Invoice);

// Example usage of BOLT12Invoice methods
console.log('Invoice Hash:', decodedBolt12Invoice.hash().toString());
console.log('Payment Hash:', decodedBolt12Invoice.payment_hash());
