# Run and Install library

Run the DLC in your lightning node

### Pre Requisite

- Lightning Node (Unannounced integration)
- NPM
- Git
- Bitcoin Core
- Bitcoinjs-lib
- Lightning Node (optional)

### Copy/paste repository

Git the repository for use in your local machine

```git
git clone https://github.com/AreaLayer/javascript-dlc.git
```

### Install via npm

You need to have already installed npm

```npm
npm install javascript-dlc
```

### Change ENV 

After change .env and lightning file accordingly with your lightning implementation (e.g. LND, CLN, LDK,etc)
```
Host=xxx
Post=xxx
TLS.cert=xxx
GRPC=xxx
Contract_info=xxx
Input_blinding_key=xxx
```
### NPM 

npm install javascript-dlc

### Run

npm run start

