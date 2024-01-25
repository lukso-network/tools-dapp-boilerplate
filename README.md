# 🏗️ LUKSO dApp Boilerplate

This repository is a TypeScript/Next.js based open-source framework to build LUKSO dApps with ease.

More information is available on our 👉 [technical documentation](https://docs.lukso.tech/learn/introduction).

![Front Page](./img/front_page.png)

## Features

- Reusable components for Universal Profiles, Assets, and Vaults
- Shared contexts for Profiles, Networks, and the Extension
- Network, interface, and metadata detection
- Integrates `web3-onboard` for extension selection
- Built-in [`ethers.js`](https://docs.ethers.org/), [`erc725.js`](https://docs.lukso.tech/tools/erc725js/getting-started), [`lsp-smart-contracts`](https://docs.lukso.tech/tools/lsp-smart-contracts/getting-started)
- Uses `Tailwind`, `Prettier`, `TypeScript`

## Development

Clone the repository:

```bash
git clone git@github.com:lukso-network/tools-dapp-boilerplate.git
```

Install all packages and libraries:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Tools

- [`Next.js`](https://nextjs.org/): React Framework
- [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts): Schemas and Interfaces for LSPs
- [`@web3-onboard/core`](https://www.npmjs.com/package/@web3-onboard/core): Connecting with various Browser Extensions
- [`@erc725/erc725.js`](https://www.npmjs.com/package/@erc725/erc725.js): ERC725 Smart Contract Interactions
- [`ethers`](https://www.npmjs.com/package/ethers): Ethereum Library for Blockchain Interactions

## Resources

- [LUKSO Documentation](https://docs.lukso.tech/)
- [Next.js Documentation](https://nextjs.org/docs)
