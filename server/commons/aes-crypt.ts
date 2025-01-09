import crypto from "crypto";

export function encryptText(data = '', encryptionKey = '') {
  const initializationVector = crypto.randomBytes(16);
  const hashedEncryptionKey = crypto.createHash('sha256').update(encryptionKey).digest('base64').substring(0, 32);
  const cipher = crypto.createCipheriv('aes256', hashedEncryptionKey, initializationVector);

  let encryptedData = cipher.update(Buffer.from(data, 'utf-8'));
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);

  return `${initializationVector.toString('base64')}:${encryptedData.toString('base64')}`;
}

export function decryptText(encryptedData = '', encryptionKey = '') {
  const [initializationVectorAsHex, encryptedDataAsHex] = encryptedData?.split(':');
  const initializationVector = Buffer.from(initializationVectorAsHex, 'base64');
  const hashedEncryptionKey = crypto.createHash('sha256').update(encryptionKey).digest('base64').substring(0, 32);
  const decipher = crypto.createDecipheriv('aes256', hashedEncryptionKey, initializationVector);
  
  let decryptedText = decipher.update(Buffer.from(encryptedDataAsHex, 'base64'));
  decryptedText = Buffer.concat([decryptedText, decipher.final()]);

  return decryptedText.toString();
}
