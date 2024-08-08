import React from 'react';
import ReactDOM from 'react-dom';
import { Chain, Network } from '@area-layer/chain';
import { Network, Chain } from 'bitcoinjs-lib';

export const chain = {
    chain: Chain.bitcoin,
    network: Network.mainnet,
    rpc: 'https://bitcoin.org/api',
    explorer: 'https://blockchain.info',
    fee: 10000,
    feePerByte: 10000,
    feePerKb: 10000000,
    feePerKbMax: 10000000,
    feePerKbMin: 10
};
