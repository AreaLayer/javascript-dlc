const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');

console.log("UTXOracle version 6\n");

// Bitcoin Core RPC settings
const rpcConfig = {
    protocol: 'http',
    host: '127.0.0.1',
    port: '8332',
    username: 'your_rpc_username',
    password: 'your_rpc_password',
};

const rpcClient = bitcoin.Client(rpcConfig);

(async function () {
    try {
        const blockCount = await rpcClient.getBlockCount();
        const blockHash = await rpcClient.getBlockHash(blockCount);
        const block = await rpcClient.getBlock(blockHash, true);
        const latestTimeInSeconds = block.time;
        const latestTimeDatetime = new Date(latestTimeInSeconds * 1000).toUTCString();
        const latestTimeUTC = latestTimeDatetime.slice(0, -4);
        const latestPriceData = await.priceData.getblockCount();

        const yesterdayInSeconds = latestTimeInSeconds - 24 * 60 * 60;
        const latestPriceDate = new Date(yesterdayInSeconds * 1000).toISOString().slice(0, 10);


