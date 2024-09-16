const { Keygen } = require ('@javascript-frost/keygen');

module.exports = Keygen;
module.exports.Keygen = Keygen;

const { KeygenError } = require ('./error');
module.exports.KeygenError = KeygenError;

const { KeygenError_InvalidKey } = require ('./error_invalid_key');
module.exports.KeygenError_InvalidKey = KeygenError_InvalidKey;

const Keygen = {
    Keygen,
    KeygenError,
    KeygenError_InvalidKey

}

module.exports = Keygen;
