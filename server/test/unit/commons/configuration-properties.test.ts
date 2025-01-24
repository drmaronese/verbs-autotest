import { readFileSync } from 'node:fs';
import { getProperties } from 'properties-file';
import { decryptText } from '../../../commons/aes-crypt';
import configProperties, { getPropString, getPropNumber, getPropBoolean } from '../../../commons/configuration-properties';

jest.mock('dotenv');
jest.mock('node:fs', () => ({
  readFileSync: jest.fn().mockReturnValue(JSON.stringify({
      'some.string': '{cipher}encryptedString',
      'some.number': '{cipher}123',
      'some.boolean': '{cipher}true',
    }))
}));
jest.mock('properties-file', () => ({
  getProperties: jest.fn().mockReturnValue({
      'some.string': '{cipher}encryptedString',
      'some.number': '{cipher}123',
      'some.boolean': '{cipher}true',
    })
}));
jest.mock('../../../commons/aes-crypt', () => ({
  decryptText: jest.fn().mockImplementation((value) => {
        return value.replace('{cipher}', ''); // simple mock decryption for testing
  })
}));
describe('Configuration Properties', () => {
  beforeEach(() => {
    const mockConfig = {
      'some.string': '{cipher}encryptedString',
      'some.number': '{cipher}123',
      'some.boolean': '{cipher}true',
    };

    //jest.clearAllMocks();
    process.env.VERBS_AUTOTEST_SECURE_KEY = 'my_secret_key'; // Set the environment variable for testing
    (readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockConfig));
    (getProperties as jest.Mock).mockReturnValue(mockConfig);
  });

  describe('decryption of properties', () => {
    it('should decrypt properties that start with {cipher}', () => {
      (decryptText as jest.Mock).mockImplementation((value) => {
        return value.replace('{cipher}', ''); // simple mock decryption for testing
      });

      const properties = require('../../../commons/configuration-properties');
      expect(properties.default['some.string']).toBe('encryptedString');
      expect(properties.default['some.number']).toBe('123');
      expect(properties.default['some.boolean']).toBe('true');
    });
  });

  describe('getPropString', () => {
    it('should return the string property value', () => {
      expect(getPropString('some.string')).toBe('encryptedString');
    });

    it('should return the default value if property is not found', () => {
      expect(getPropString('undefined.string', 'default')).toBe('default');
    });
  });

  describe('getPropNumber', () => {
    it('should return the number property value', () => {
      expect(getPropNumber('some.number')).toBe(123);
    });

    it('should return the default value if property is not found', () => {
      expect(getPropNumber('undefined.number', 10)).toBe(10);
    });
  });

  describe('getPropBoolean', () => {
    it('should return the boolean property value', () => {
      expect(getPropBoolean('some.boolean')).toBe(true);
    });

    it('should return the default value if property is not found', () => {
      expect(getPropBoolean('undefined.boolean', true)).toBe(true);
    });
  });
});