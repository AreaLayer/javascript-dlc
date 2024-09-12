"use strict";

// src/workers/sig-verification.ts
var import_secp256k1 = require("@noble/curves/secp256k1");
var import_sha256 = require("@noble/hashes/sha256");
globalThis.onmessage = (msg) => {
  const { serialized, id, sig, pubkey } = msg.data;
  queueMicrotask(() => {
    const eventHash = (0, import_sha256.sha256)(new TextEncoder().encode(serialized));
    const buffer = Buffer.from(id, "hex");
    const idHash = Uint8Array.from(buffer);
    if (!compareTypedArrays(eventHash, idHash)) {
      postMessage([id, false]);
      return;
    }
    const result = import_secp256k1.schnorr.verify(sig, buffer, pubkey);
    postMessage([id, result]);
  });
};
function compareTypedArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
