import { KeyringPair } from "@polkadot/keyring/types";
import { ethers } from "ethers";

import {
  decryptAES,
  decryptKeyringPair,
  encryptAES,
  encryptEthers,
  encryptKeyringPair,
  decryptEthers,
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

    return encryptEthers(provider, walletAddress, message);
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const decryptedMessage = await decryptEthers(
      provider,
      walletAddress,
      encryptedAccountData
    );

    return SubAccounts.decrypt(decryptedMessage, accountPassword, aesPassword);
  }
}
