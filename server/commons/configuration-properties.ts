import { readFileSync } from 'node:fs'
import { getProperties } from 'properties-file'
import path from 'path';

const configProperties = getProperties(readFileSync(path.resolve(__dirname, '..', 'config', 'application.properties')));

export default configProperties;

export function getPropString(propName: string): string {
  return configProperties[propName];
}

export function getPropNumber(propName: string): number {
  return Number(configProperties[propName]);
}

export function getPropBoolean(propName: string): boolean {
  return configProperties[propName].toLowerCase() == 'true';
}
