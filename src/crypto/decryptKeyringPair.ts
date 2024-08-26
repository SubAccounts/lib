import { Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

export function decryptKeyringPair(
  jsonDataString: string,
  password: string
): KeyringPair {
  const keyring = new Keyring();
  const decodedAccount = keyring.addFromJson(JSON.parse(jsonDataString));

  decodedAccount.decodePkcs8(password);

  return decodedAccount;
}
