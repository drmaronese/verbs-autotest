import dotenv from 'dotenv';
import { encryptText } from "./commons/aes-crypt";

dotenv.config();
const secretKey = process.env.VERBS_AUTOTEST_SECURE_KEY;

const text: string = process.argv[2];

if (text === undefined) {
  console.log("Syntax: npm run encrypt <text-to-encrypt>");
  process.exit(1);
}

console.log("Text to encrypt: [%s]", text);

const textEncrypted: string = encryptText(text, secretKey);

console.log("Text encrypted: [%s]", textEncrypted);
