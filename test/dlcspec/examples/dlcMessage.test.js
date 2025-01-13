const { expect } = require('chai');
const { createOfferMessage, createAcceptMessage, createFinalizeMessage } = require('../lib/dlcMessage');

describe('DLC Messaging Tests', () => {
    it('should create a valid offer message', () => {
        const offer = createOfferMessage({
            terms: "BTC/USDT price >= $30k",
            oraclePublicKey: "0250863AD64A87AE8A2FE83C1AF1A8403CBF934F4AA010CEAB9E8E37A26E7206F7",
            refundLockTime: 100,
        });

        expect(offer).to.have.property('type', 'DLC_OFFER');
    });

    it('should accept a valid offer message', () => {
        const offer = createOfferMessage({
            terms: "BTC/USDT price >= $30k",
            oraclePublicKey: "0250863AD64A87AE8A2FE83C1AF1A8403CBF934F4AA010CEAB9E8E37A26E7206F7",
            refundLockTime: 100,
        });

        const accept = createAcceptMessage({
            offerMessage: offer,
            publicKey: "02c72c5d1dfd462ffbe73518c1b71a89173ef8812378e7ec0df79b6a3a20f62cae",
        });

        expect(accept).to.have.property('type', 'DLC_ACCEPT');
    });
});
