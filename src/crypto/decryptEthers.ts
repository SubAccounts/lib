import { ethers } from "ethers";

export async function decryptEthers(
  provider: ethers.providers.Web3Provider,
  walletAddress: string,
  encryptedAccountData: string
): Promise<string> {
  const encryptedMessageString = ethers.utils.hexlify(
    Buffer.from(JSON.stringify(encryptedAccountData))
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const decryptedMessage = await provider.provider.request({
    method: "eth_decrypt",
    params: [encryptedMessageString, walletAddress],
  });

  return decryptedMessage;
}
