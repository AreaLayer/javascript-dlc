const { lnrpc } = require('lnrpc');
const grpc = require('grpc');

async function generateContractId(lndClient, contractInfo) {
  const response = await lndClient.discreetDial.generateContractId({ contractInfo });
  return response.contractId;
}

async function signContractInput(clnClient, contractId, contractInfo, inputAmount, inputBlindingKey) {
  const request = {
    contractId,
    contractInfo,
    inputAmount,
    inputBlindingKey
  };

  const response = await lndClient.discreetDial.signContractInput(request);
  return response.signature;
}

// Example usage:
const lndHost = 'YOUR_LND_HOST'; // e.g., localhost:10009
const tlsCertPath = 'PATH_TO_TLS_CERT_FILE'; // Path to your CLN TLS certificate file

const lndClient = new lnrpc.Lightning(lndHost, grpc.credentials.createSsl(tlsCertPath));

const contractInfo = 'YOUR_CONTRACT_INFO';
const inputAmount = 100000000; // Amount in satoshis
const inputBlindingKey = 'YOUR_INPUT_BLINDING_KEY';

(async () => {
  try {
    const contractId = await generateContractId(lndClient, contractInfo);
    console.log(`Contract ID: ${contractId}`);

    const signature = await signContractInput(lndClient, contractId, contractInfo, inputAmount, inputBlindingKey);
    console.log(`Signature: ${signature}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
