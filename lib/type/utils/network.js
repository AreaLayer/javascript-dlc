// Available network types
const TAvailableNetworks = ['bitcoin', 'bitcoinTestnet', 'bitcoinMainnet'];

// Available network configuration
const EAvailableNetworks = {
  bitcoin: "bitcoin",
  bitcoinTestnet: "bitcoinTestnet",
};

// Network interface
const INetwork = {
  messagePrefix: '',
  bech32: '',
  bip32: {
    public: 0,
    private: 0,
  },
  pubKeyHash: 0,
  scriptHash: 0,
  wif: 0,
};

// Networks object
const networks = {
  [EAvailableNetworks.bitcoin]: INetwork,
  [EAvailableNetworks.bitcoinTestnet]: INetwork,
};

// Export the types and objects
module.exports = {
  TAvailableNetworks,
  EAvailableNetworks,
  INetwork,
  networks,
};

