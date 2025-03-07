const crypto = require('crypto');

const encryptMessage = (message) => {
//   const salt = process.env.SALT_KEY;
//   const hash = crypto.createHmac('sha256', salt).update(message).digest('hex');
//   return hash;

  const salt = process.env.SALT_KEY;
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(salt, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

module.exports = { encryptMessage };