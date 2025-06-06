// service-worker.ts
import { Worker } from '@arkade-os/sdk'

// Worker is a class handling the communication between the main thread and the service worker
new Worker().start()

// specify the path to the service worker file
// this will automatically register the service worker
const wallet = await ServiceWorkerWallet.create('/service-worker.js')

// initialize the wallet
await wallet.init({
  network: 'mutinynet',  // 'bitcoin', 'testnet', 'regtest', 'signet' or 'mutinynet'
  identity: identity,
  // Esplora API, can be left empty mempool.space API will be used
  esploraUrl: 'https://mutinynet.com/api', 
  // OPTIONAL Ark Server connection information
  arkServerUrl: 'https://mutinynet.arkade.sh',
  arkServerPublicKey: 'fa73c6e4876ffb2dfc961d763cca9abc73d4b88efcb8f5e7ff92dc55e9aa553d'
})