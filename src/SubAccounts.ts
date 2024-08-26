import * as sigUtil from "@metamask/eth-sig-util";
import { KeyringPair } from "@polkadot/keyring/types";
import { ethers } from "ethers";

import {
  decryptAES,
  decryptKeyringPair,
  encryptAES,
  encryptKeyringPair,
} from "./crypto";

export class SubAccounts {
  static encrypt(
    account: KeyringPair,
    accountPassword: string,
    aesPassword: string
  ): string {
    return encryptAES(
      JSON.stringify(encryptKeyringPair(account, accountPassword)),
      aesPassword
    ).toString();
  }

  static async encryptWithEthers(
    provider: ethers.providers.Web3Provider,
    walletAddress: string,
    account: KeyringPair,
    accountPassword: string,
    aesPassword: string
  ): Promise<string> {
    const message = SubAccounts.encrypt(account, accountPassword, aesPassword);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const publicKey = await provider.provider.request({
      method: "eth_getEncryptionPublicKey",
      params: [walletAddress],
    });

    const encryptedMessage = sigUtil.encrypt({
      publicKey: publicKey,
      data: message,
      version: "x25519-xsalsa20-poly1305",
    });

    return JSON.stringify(encryptedMessage);
  }

  static decrypt(
    encryptedAccountData: string,
    accountPassword: string,
    aesPassword: string
  ): KeyringPair {
    return decryptKeyringPair(
      decryptAES(encryptedAccountData, aesPassword),
      accountPassword
    );
  }

  static async decryptWithEthers(
    provider: ethers.providers.Web3Provider,
    walletAddress: string,
    encryptedAccountData: string,
    accountPassword: string,
    aesPassword: string
  ): Promise<KeyringPair> {
    const encryptedMessageString = ethers.utils.hexlify(
      Buffer.from(JSON.stringify(encryptedAccountData))
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const decryptedMessage = await provider.provider.request({
      method: "eth_decrypt",
      params: [encryptedMessageString, walletAddress],
    });

    return SubAccounts.decrypt(decryptedMessage, accountPassword, aesPassword);
  }
}
