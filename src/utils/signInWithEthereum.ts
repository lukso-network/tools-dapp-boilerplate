// Sign In With Ethereum
import { SiweMessage } from 'siwe'
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json'
import { ethers } from 'ethers'
import { EIP_1271_MAGIC_VALUE } from '@/consts/constants'

// Sign In With Ethereum
const signInWithEthereum = async ({
  account,
  provider,
  updateAccountInfo,
  chainId,
}: {
  account: string | null
  provider: ethers.BrowserProvider | null
  updateAccountInfo: (data: AccountData) => void
  chainId: number
}) => {
  // SIWE requires an connected account of a supported network
  if (!account || !provider) {
    console.log('No account connected')
    return
  }

  const siweMessage = new SiweMessage({
    domain: window.location.host,
    address: account,
    statement: 'By logging in you agree to the terms and conditions.',
    uri: window.location.origin,
    version: '1',
    chainId: Number(chainId),
    resources: ['https://boilerplate.lukso.tech'],
  })

  const message = siweMessage.prepareMessage()
  const hashedMessage = ethers.hashMessage(message)

  try {
    /**
     * Get the signer of the extension.
     *
     * Within the UP extension, this will return the single
     * connected profile. To keep compatability with regular
     * wallets allowing for multiple connections, the current
     * account address is passed.
     */
    const signer = await provider.getSigner(account)

    const signature = await signer.signMessage(message)

    // Create the UniversalProfile contract instance
    const myUniversalProfileContract = new ethers.Contract(
      account,
      UniversalProfileContract.abi,
      provider
    )

    const isValidSignature = await myUniversalProfileContract.isValidSignature(
      hashedMessage,
      signature
    )

    // Update global account data
    updateAccountInfo({
      account: account,
      isVerified: isValidSignature === EIP_1271_MAGIC_VALUE,
    })
  } catch (error) {
    console.error('Error on signing message: ', error)
  }
}

export default signInWithEthereum
