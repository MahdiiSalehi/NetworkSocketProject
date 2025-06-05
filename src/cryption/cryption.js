// In the name of ALLAH!
// Mahdi Salehi

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Read the keys from PEM files
const publicKey = fs.readFileSync(path.join(__dirname, 'public.pem'), 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname, 'private.pem'), 'utf8');

/**
 * Encrypts a message using the recipient's public key.
 * @param {string} message - The plaintext message to encrypt.
 * @returns {string} The encrypted message in base64 format.
 */
function encrypt(message, receiverPublicKey) {
  const buffer = Buffer.from(message, 'utf8');
  const encrypted = crypto.publicEncrypt(receiverPublicKey, buffer);
  return encrypted.toString('base64');
}

/**
 * Decrypts an encrypted message using the recipient's private key.
 * @param {string} encryptedMessage - The encrypted message (base64 format).
 * @returns {string} The decrypted plaintext message.
 */
function decrypt(encryptedMessage) {
  const buffer = Buffer.from(encryptedMessage, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}


module.exports = { encrypt, decrypt, publicKey };
