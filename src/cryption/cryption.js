// In the name of ALLAH!
// Mahdi Salehi

const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; 
const sharedKey = crypto.randomBytes(32);  // For demo, generate a random key
  
// Encrypt function: returns an object with iv and encrypted data.
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, sharedKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    data: encrypted
  };
}

// Decrypt function: accepts an object containing the iv and the encrypted data.
function decrypt(encryptedObj) {
  const iv = Buffer.from(encryptedObj.iv, 'hex');
  const encryptedText = Buffer.from(encryptedObj.data, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, sharedKey, iv);
  let decrypted = decipher.update(encryptedText, 'binary', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


module.exports = { encrypt, decrypt };