import AES from "crypto-js/aes";
import CryptoJS from "crypto-js/core";

export function decryptAES(dataString: string, password: string): string {
  const decryptedData = AES.decrypt(dataString, password);

  return decryptedData.toString(CryptoJS.enc.Utf8);
}
