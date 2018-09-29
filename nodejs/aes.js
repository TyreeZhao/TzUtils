const crypto = require('crypto');

const ZeroLengthBuffer = Buffer.alloc(0);

/**
 * Encrypt a string with AES aes-128-ecb
 * Notice that 'aes-128-ecb' does not use IV, so it should always be zero buffer
 * @param data
 * @param key
 * @returns {string}
 */
function encrypt(data, key) {
  var cipherChunks = [];
  var cipher = crypto.createCipheriv('aes-128-ecb', key, ZeroLengthBuffer);
  cipherChunks.push(cipher.update(data, 'utf-8', 'hex'));
  cipherChunks.push(cipher.final('hex'));

  return cipherChunks.join('');
}

/**
 * Decrypt an AES aes-128-ecb encrypted string.
 * Notice that 'aes-128-ecb' does not use IV, so it should always be zero buffer
 * @param data data to decrypt
 * @param key aes key for decryption
 *
 * @returns {string}
 */
function decrypt(data, key) {
  var cipherChunks = [];
  var decipher = crypto.createDecipheriv('aes-128-ecb', key, ZeroLengthBuffer);
  cipherChunks.push(decipher.update(data, 'hex', 'utf-8'));
  cipherChunks.push(decipher.final('utf-8'));

  return cipherChunks.join('');
}

module.exports = {
  encrypt,
  decrypt,
};

