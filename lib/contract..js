class Contract {
  constructor(address, abi, provider) {
    this.address = address;
    this.abi = abi;
    this.provider = provider;
    this.contract = new provider.eth.Contract(abi, address);
  }

  async call(methodName, ...args) {
    const method = this.contract.methods[methodName](...args);
    const result = await method.call();
    return result;
  }

  async sendTransaction(methodName, options, ...args) {
    const method = this.contract.methods[methodName](...args);
    const tx = {
      from: options.from,
      to: this.address,
      gas: options.gas,
      gasPrice: options.gasPrice,
      value: options.value,
      data: method.encodeABI()
    };
    const signedTx = await this.provider.eth.accounts.signTransaction(tx, options.privateKey);
    const result = await this.provider.eth.sendSignedTransaction(signedTx.rawTransaction);
    return result;
  }
}

const Web3 = require('web3');
const providerUrl = 'https://ropsten.infura.io/v3/YOUR_PROJECT_ID';
const web3 = new Web3(providerUrl);

const address = '0x1234567890123456789012345678901234567890';
const abi = [{
  "constant": true,
  "inputs": [{ "name": "x", "type": "uint256" }],
  "name": "multiply",
  "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}];
const contract = new Contract(address, abi, web3);

async function testContract() {
  const result = await contract.call('multiply', 7);
  console.log(`Result: ${result}`);

  const privateKey = 'YOUR_PRIVATE_KEY';
  const options = {
    from: 'YOUR_ADDRESS',
    gas: 100000,
    gasPrice: web3.utils.toWei('10', 'gwei'),
    value: 0,
    privateKey: privateKey
  };
  const txResult = await contract.sendTransaction('multiply', options, 5);
  console.log(`Transaction hash: ${txResult.transactionHash}`);
}

testContract();
