const { spawnSync } = require('child_process');
const network = bitcoin.networks.testnet;

function runLdkCommand(args) {
  const ldkProcess = spawnSync('ldk', args);
  if (ldkProcess.error) {
    throw new Error(`Error executing LDK command: ${ldkProcess.error}`);
  }

  if (ldkProcess.status !== 0) {
    throw new Error(`LDK command returned non-zero status: ${ldkProcess.stderr.toString()}`);
  }

  return ldkProcess.stdout.toString();
}

function generateContractId(oraclePublicKey, oracleRValue, contractInfo) {
  const args = [
    'discreet', 'contract_id',
    '--oracle_pub_key', oraclePublicKey,
    '--oracle_r_value', oracleRValue,
    '--contract_info', contractInfo
  ];

  const contractId = runLdkCommand(args).trim();
  return contractId;
}

function signContractInput(contractId, contractInfo, inputAmount, inputBlindingKey) {
  const args = [
    'discreet', 'sign',
    '--contract_id', contractId,
    '--contract_info', contractInfo,
    '--input_amount', inputAmount,
    '--input_blinding_key', inputBlindingKey
  ];

  const signature = runLdkCommand(args).trim();
  return signature;
}

// Example usage:
const oraclePublicKey = 'YOUR_ORACLE_PUBLIC_KEY';
const oracleRValue = 'YOUR_ORACLE_R_VALUE';
const contractInfo = 'YOUR_CONTRACT_INFO';
const inputAmount = 100000000; // Amount in satoshis
const inputBlindingKey = 'YOUR_INPUT_BLINDING_KEY';

const contractId = generateContractId(oraclePublicKey, oracleRValue, contractInfo);
console.log(`Contract ID: ${contractId}`);

const signature = signContractInput(contractId, contractInfo, inputAmount, inputBlindingKey);
console.log(`Signature: ${signature}`);



                 
