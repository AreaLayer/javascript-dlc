import { generateKeyPairSync, createSign, createVerify , KeyObject , constants } = require ('bitcoinjs-lib')

const { ECPair } = require ('bitcoinjs-lib')

const { ec } = require ('elliptic')

const { secp256k1 } = require ('elliptic')

const generateKeyPairSync = require ('elliptic').ec.keyPair

const { createHash } = require ('crypto')

const createSign = require ('elliptic').ec.sign

const createVerify = require ('elliptic').ec.verify

const { KeyObject } = require ('crypto')

const { constants } = require ('elliptic')

fn generateKeyPairSync = () => {
  return generateKeyPairSync ('secp256k1')
}