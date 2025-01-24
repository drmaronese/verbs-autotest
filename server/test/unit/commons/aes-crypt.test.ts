import { encryptText, decryptText } from '../../../commons/aes-crypt';
import crypto from 'crypto';

jest.mock('crypto');

describe('Encryption Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const encryptionKey = 'my_secret_key';
  const dataToEncrypt = 'Hello, World!';
  
  it('should encrypt the text correctly', () => {
    // Mocking the crypto functions used in encryptText
    const mockInitializationVector = Buffer.from('1234567890abcdef'); // Example IV
    const mockEncryptedData = Buffer.from('encrypted_data'); // Simulated encrypted data

    (crypto.randomBytes as jest.Mock).mockReturnValue(mockInitializationVector);
    (crypto.createHash as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue('hashed_key')
    });
    (crypto.createCipheriv as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnValue(mockEncryptedData),
      final: jest.fn().mockReturnValue(Buffer.from('final_data'))
    });

    const result = encryptText(dataToEncrypt, encryptionKey);
    
    expect(crypto.randomBytes).toHaveBeenCalledWith(16);
    expect(crypto.createHash).toHaveBeenCalledWith('sha256');
    expect(crypto.createCipheriv).toHaveBeenCalledWith('aes256', 'hashed_key', mockInitializationVector);
    expect(result).toBe(`${mockInitializationVector.toString('base64')}:${Buffer.concat([mockEncryptedData, Buffer.from('final_data')]).toString('base64')}`);
  });

  it('should decrypt the text correctly', () => {
    // Mocking the crypto functions used in decryptText
    const mockInitializationVector = Buffer.from('1234567890abcdef'); // Example IV
    const encryptedData = `${mockInitializationVector.toString('base64')}:encrypted_data`;

    (crypto.createHash as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue('hashed_key')
    });
    (crypto.createDecipheriv as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnValue(Buffer.from('decrypted_text')),
      final: jest.fn().mockReturnValue(Buffer.from(''))
    });

    const result = decryptText(encryptedData, encryptionKey);
    
    expect(crypto.createHash).toHaveBeenCalledWith('sha256');
    expect(crypto.createDecipheriv).toHaveBeenCalledWith('aes256', 'hashed_key', mockInitializationVector);
    expect(result).toBe('decrypted_text');
  });

  it('should throw an error if decryption fails', () => {
    const invalidEncryptedData = 'invalid_data';

    (crypto.createDecipheriv as jest.Mock).mockImplementation(() => {
      throw new Error('Decryption error');
    });

    expect(() => decryptText(invalidEncryptedData, encryptionKey)).toThrow('Decryption error');
  });
});