// 导入 Node.js 中的 Crypto 模块
const crypto = require('crypto');

// 定义加密和解密所需的密钥
const algorithm = 'aes-256-cbc';
const secretKey = crypto.createHash('sha256').update('mySecretKey').digest(); // 用于加密和解密的密钥，长度为 32 字节
const iv = Buffer.alloc(16, 0); // 初始化向量，对称加密算法需要使用

// 获取当前时间戳
const currentTimestamp = Math.floor(Date.now() / 1000); // 获取当前时间戳，并转换为秒数

// 创建加密函数
function encrypt(text, key, initializationVector) {
  const cipher = crypto.createCipheriv(algorithm, key, initializationVector);
  let encrypted = cipher.update(text.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// 创建解密函数
function decrypt(encrypted, key, initializationVector) {
  const decipher = crypto.createDecipheriv(algorithm, key, initializationVector);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 对当前时间戳进行加密
const encryptedTimestamp = encrypt(currentTimestamp, secretKey, iv);
console.log('加密后的时间戳：', encryptedTimestamp);

// 对加密后的时间戳进行解密
const decryptedTimestamp = decrypt(encryptedTimestamp, secretKey, iv);
console.log('解密后的时间戳：', decryptedTimestamp);
