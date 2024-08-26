# SubAccounts Library

## Overview

This library provides a set of utilities and wrappers that simplify working with the **[SubAccounts](https://sub-accounts.org/)** project. The core features include encryption and decryption of accounts using AES and integration with Ethereum.

The library is designed to create and manage Substrate accounts securely, enabling their use in applications supporting Ethereum.

## Key Features

- **Account Encryption and Decryption:** Wrappers for convenient AES encryption and decryption.
- **MetaMask Integration:** Utilities for encrypting and decrypting data using Ethereum public and private keys.
- **Polkadot.js Keyring Compatibility:** Support for encrypting and decrypting Substrate account keys.

## Installation

To use this library, install the dependencies:

```bash
npm install sub-accounts-lib
```

## Usage

### Encrypting an Account

You can encrypt a Substrate account using both an account password and an AES password:

```typescript
import { SubAccounts } from './SubAccounts';
import { Keyring } from '@polkadot/api';

// Initialize a keyring and create an account
const keyring = new Keyring({ type: 'sr25519' });
const account = keyring.addFromUri('//Alice');

// Encrypt the account
const encryptedAccount = SubAccounts.encrypt(account, 'accountPassword', 'aesPassword');
console.log('Encrypted Account:', encryptedAccount);
```

### Decrypting an Account

To decrypt the account:

```typescript
const decryptedAccount = SubAccounts.decrypt(encryptedAccount, 'accountPassword', 'aesPassword');
console.log('Decrypted Account:', decryptedAccount.address);
```

### Encrypting with Ethereum provider

If you want to encrypt the account using MetaMask’s encryption:

```typescript
const provider = new ethers.providers.Web3Provider(__PROVIDER__);
const walletAddress = await provider.getSigner().getAddress();

const encryptedWithMetaMask = await SubAccounts.encryptWithEthers(
  provider,
  walletAddress,
  account,
  'accountPassword',
  'aesPassword'
);
console.log('Encrypted with Ethereum:', encryptedWithMetaMask);
```

### Decrypting with Ethereum provider

To decrypt the account using Ethereum:

```typescript
const decryptedWithMetaMask = await SubAccounts.decryptWithEthers(
  provider,
  walletAddress,
  encryptedWithMetaMask,
  'accountPassword',
  'aesPassword'
);
console.log('Decrypted with Ethereum:', decryptedWithMetaMask.address);
```

## Library Structure

### Main Files:

- **`SubAccounts.ts`:** Core logic for account encryption and decryption.
- **`encryptAES.ts` and `decryptAES.ts`:** Utilities for AES encryption and decryption.
- **`encryptKeyringPair.ts` and `decryptKeyringPair.ts`:** Wrappers for encrypting and decrypting Polkadot.js Keyring pairs.

## Contributing

We welcome your questions and contributions to improve the library. Feel free to submit PRs and issues to the repository.

## License

MIT License.
