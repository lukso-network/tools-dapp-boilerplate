import { SiweMessage } from 'siwe';
import { ethers } from 'ethers';
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

import { EIP_1271_MAGIC_VALUE } from '@/consts/constants';

/**
 * Performs sign in with Ethereum in with a wallet or Universal
 * Profile to proof ownership over an address.
 *
 * Documentation: https://docs.lukso.tech/learn/dapp-developer/siwe
 *
 * @param {object} params - The parameters for the sign-in operation.
 * @param {string | null} params.account - The Ethereum account address to sign in with.
 * @param {ethers.BrowserProvider | null} params.provider - The provider connected to the blockchain.
 * @param {(data: AccountData) => void} params.updateAccountInfo - Callback function to update the account information in the application's state.
 * @param {number} params.chainId - The chain ID of the blockchain to which the provider is connected.
 *
 * @returns {Promise<void>} A promise that resolves when the sign-in operation is complete.
 *
 */
const signInWithEthereum = async ({
  account,
  provider,
  updateVerification,
  chainId,
}: {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  updateVerification: (isVerified: boolean) => void;
  chainId: number;
}) => {
  // SIWE requires an connected account of a supported network
  if (!account || !provider) {
    console.log('No account connected');
    return;
  }

  const siweMessage = new SiweMessage({
    domain: window.location.host,
    address: account,
    statement: 'By logging in you agree to the terms and conditions.',
    uri: window.location.origin,
    version: '1',
    chainId: Number(chainId),
    resources: ['https://boilerplate.lukso.tech'],
  });

  const message = siweMessage.prepareMessage();
  const hashedMessage = ethers.hashMessage(message);

  try {
    /**
     * Get the signer of the extension.
     *
     * Within the UP extension, this will return the single
     * connected profile. To keep compatability with regular
     * wallets allowing for multiple connections, the current
     * account address is passed.
     */
    const signer = await provider.getSigner(account);

    const signature = await signer.signMessage(message);

    // Create the UniversalProfile contract instance
    const myUniversalProfileContract = new ethers.Contract(
      account,
      UniversalProfileContract.abi,
      provider
    );

    const isValidSignature = await myUniversalProfileContract.isValidSignature(
      hashedMessage,
      signature
    );

    // Update global account data
    updateVerification(isValidSignature === EIP_1271_MAGIC_VALUE);
  } catch (error) {
    console.error('Error on signing message: ', error);
  }
};

export default signInWithEthereum;
