import AES from "crypto-js/aes";
import CryptoJS from "crypto-js/core";

export function encryptAES(
  data: string,
  password: string
): CryptoJS.lib.CipherParams {
  const aesEncodedAccount = AES.encrypt(data, password);

  return aesEncodedAccount;
}
