import * as sigUtil from "@metamask/eth-sig-util";
import { ethers } from "ethers";

export async function encryptEthers(
  provider: ethers.providers.Web3Provider,
  walletAddress: string,
  message: string
): Promise<string> {
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
