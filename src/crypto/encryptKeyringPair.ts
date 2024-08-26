import { KeyringPair } from "@polkadot/keyring/types";

export function encryptKeyringPair(keyringPair: KeyringPair, password: string) {
  return keyringPair.toJson(password);
}
