class Chain {
  constructor(name, genesisBlock) {
    this.name = name;
    this.blocks = [genesisBlock];
  }

  getLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(block) {
    const latestBlock = this.getLatestBlock();
    block.previousHash = latestBlock.hash;
    block.index = latestBlock.index + 1;
    block.mineBlock();
    this.blocks.push(block);
  }

  isValid() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

class Block {
  constructor(timestamp, data, previousHash = '') {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.index = 0;
  }

  calculateHash() {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    const data = `${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}${this.nonce}`;
    hash.update(data);
    return hash.digest('hex');
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }
}

const genesisBlock = new Block('01/01/2022', { amount: 100 }, '');
const chain = new Chain('MyChain', genesisBlock);

chain.addBlock(new Block('02/01/2022', { amount: 50 }));
chain.addBlock(new Block('03/01/2022', { amount: 25 }));

console.log(`Is chain valid? ${chain.isValid()}`);
console.log(JSON.stringify(chain, null, 2));
