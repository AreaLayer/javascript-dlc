// Initialize the wallet
await init(walletType, clientType, serverUrl, privateKey, password, chain);

// Unlock the wallet
await unlock(password);

// Lock the wallet
await lock(password);

// Get balance
const balance = await balance(false);

// Onboard funds
const onboardTxID = await onboard(amount);

// Get receive addresses
const addresses = await receive();

// Send off-chain
const txID = await sendOffChain(false, [{ To: address, Amount: amount }]);

// Get configuration
const serverUrl = await getServerUrl();
const serverPubKeyHex = await getserverPubKeyHex();
const walletType = await getWalletType();
const clientType = await getClientType();
const roundLifetime = await getRoundLifetime();
const unilateralExitDelay = await getUnilateralExitDelay();
const minRelayFee = await getMinRelayFee();
const maxRelayFee = await getMaxRelayFee();