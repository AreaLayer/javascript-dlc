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

        const yesterdayInSeconds = latestTimeInSeconds - 24 * 60 * 60;
        const latestPriceDate = new Date(yesterdayInSeconds * 1000).toISOString().slice(0, 10);

        console.log(`Connected to local node at block #: ${blockCount}`);
        console.log(`Latest available price date is: ${latestPriceDate}`);
        console.log("Earliest available price date is: 2020-07-26  (full node)");

        // Your date input logic here

        // Rest of the code (Parts 4 to 9) would go here

    } catch (error) {
        console.error("Error connecting to your node. Trouble shooting steps:\n");
        console.error("1) Make sure Bitcoin Core is running and reachable.");
        console.error("2) Make sure you have set up your Bitcoin Core RPC configuration.");
        console.error("3) Explore the Bitcoin Core RPC options in your JavaScript code.");
        console.error("\nThe error was:", error);
        process.exit(1);
    }
})();

