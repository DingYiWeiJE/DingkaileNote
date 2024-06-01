import crypto from 'crypto';

// 定义加密和解密所需的密钥
const algorithm: string = 'aes-256-cbc';
const secretKey: Buffer = crypto.createHash('sha256').update('dingkailedemengzhognhuayuan').digest(); // 用于加密和解密的密钥，长度为 32 字节
const iv: Buffer = Buffer.alloc(16, 0); // 初始化向量，对称加密算法需要使用

// 创建加密函数
export function encrypt(text: string | Buffer): string {
  const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted: string = cipher.update(text.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// 创建解密函数
function decrypt(encrypted: string): string {
  const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted: string = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export default { };