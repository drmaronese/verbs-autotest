import { encryptText, decryptText } from "./commons/aes-crypt";
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.VERBS_AUTOTEST_SECURE_KEY;

const text: string = process.argv[2];

if (text === undefined) {
  console.log("Syntax: npm run decrypt <text-to-decrypt>");
  process.exit(1);
}

console.log("Text to decrypt: [%s]", text);

const textDecrypted: string = decryptText(text, secretKey);

console.log("Text decrypted: [%s]", textDecrypted);
