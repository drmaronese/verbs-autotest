import dotenv from 'dotenv';
import { readFileSync } from 'node:fs';
import path from 'path';
import { getProperties } from 'properties-file';
import { decryptText } from './aes-crypt';

dotenv.config();
const secretKey = process.env.VERBS_AUTOTEST_SECURE_KEY;

const CIPHER: string = "{cipher}";

const configProperties = getProperties(
  readFileSync(path.resolve(__dirname, '..', 'config', 'application.properties'))
    .toString());

for(let propKey in configProperties) {
  let propValue = configProperties[propKey];
  if (propValue !== undefined && propValue.startsWith(CIPHER)) {
    propValue = propValue.replace(CIPHER, "");
    propValue = decryptText(propValue, secretKey);
    configProperties[propKey] = propValue;
  }
}

export default configProperties;


export function getPropString(propName: string, defaultValue?: string): string {
  if (configProperties[propName] === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  return configProperties[propName];
}

export function getPropNumber(propName: string, defaultValue?: number): number {
  if (configProperties[propName] === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  return Number(configProperties[propName]);
}

export function getPropBoolean(propName: string, defaultValue?: boolean): boolean {
  if (configProperties[propName] === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  return configProperties[propName].toLowerCase() == 'true';
}
