const bitcoin = require('bitcoinjs-lib');
const secp256k1 = require('secp256k1');
const { sha256 } = require('./utils');

// Create a DLC Offer Message
function createOfferMessage({ terms, oraclePublicKey, refundLockTime }) {
    if (!terms || !oraclePublicKey || !refundLockTime) {
        throw new Error('Invalid parameters for offer message');
    }

    return {
        type: 'DLC_OFFER',
        terms,
        oraclePublicKey,
        refundLockTime,
    };
}

// Accept DLC Offer
function createAcceptMessage({ offerMessage, publicKey }) {
    if (offerMessage.type !== 'DLC_OFFER') {
        throw new Error('Invalid offer message');
    }

    return {
        type: 'DLC_ACCEPT',
        offerMessage,
        publicKey,
    };
}

// Finalize DLC Contract
function createFinalizeMessage({ acceptMessage, outcomeSignature }) {
    if (acceptMessage.type !== 'DLC_ACCEPT') {
        throw new Error('Invalid accept message');
    }

    return {
        type: 'DLC_FINALIZE',
        acceptMessage,
        outcomeSignature,
    };
}

module.exports = {
    createOfferMessage,
    createAcceptMessage,
    createFinalizeMessage,
};
