const {UTXO, Payment, P2TR} = require('bitcoinjs-lib');
const OracleInfo = require('./oracleInfo')

const oracle = {
    getUTXO: async (txid, vout) => {
        const utxo = await UTXO.fromTxid(txid, vout)
        return utxo
    },
    getPayment: async (utxo) => {
        const payment = await Payment.fromUTXO(utxo)
        return payment
    },
    getP2TR: async (utxo) => {
        const p2tr = await P2TR.fromUTXO(utxo)
        return p2tr
    }
}
const OracleInfo = 
{
    getUTXO,
    getPayment,
    getP2TR
}

const {getUTXO, getPayment, getP2TR} = oracle
confirmation.getUTXO = getUTXO;
confirmation.getPayment = getPayment;
confirmation.getP2TR = getP2TR;

const OracleInfo = {
    getUTXO,
    getPayment,
    getP2TR
}