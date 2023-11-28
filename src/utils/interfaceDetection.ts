import { ethers } from 'ethers'
import erc165ABI from './erc165ABI.json'

const provider = new ethers.BrowserProvider(window.ethereum)

/**
 * Checks if a smart contract has a certain ERC165 interface.
 *
 * @param contractAddress smart contract to call.
 * @param interfaceId interface ID to check.
 * @returns true if interface was detected.
 */
export async function supportsInterface(
  contractAddress: string,
  interfaceId: string
): Promise<boolean> {
  const contract = new ethers.Contract(contractAddress, erc165ABI, provider)
  try {
    return await contract.supportsInterface(interfaceId)
  } catch (error) {
    console.error('Error checking interface support:', error)
    return false
  }
}

// HOW TO USE:
// import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/dist/constants.cjs.js'
// const isLSP0 = await supportsInterface( contractAddress, INTERFACE_IDS.LSP0ERC725Account)

/*
Supported interfaces from lsp-smart-contracts library:

INTERFACE_IDS.ERC165                        INTERFACE_IDS.ERC20
INTERFACE_IDS.ERC223                        INTERFACE_IDS.ERC721
INTERFACE_IDS.ERC721Metadata                INTERFACE_IDS.ERC725X
INTERFACE_IDS.ERC725Y                       INTERFACE_IDS.ERC777
INTERFACE_IDS.ERC1155         

INTERFACE_IDS.LSP0ERC725Account             INTERFACE_IDS.LSP1UniversalReceiver
INTERFACE_IDS.LSP6KeyManager                INTERFACE_IDS.LSP7DigitalAsset
INTERFACE_IDS.LSP8IdentifiableDigitalAsset  INTERFACE_IDS.LSP9Vault
INTERFACE_IDS.LSP11BasicSocialRecovery      INTERFACE_IDS.LSP14Ownable2Step
INTERFACE_IDS.LSP17Extendable               INTERFACE_IDS.LSP17Extension
INTERFACE_IDS.LSP20CallVerification         INTERFACE_IDS.LSP20CallVerifier
INTERFACE_IDS.LSP25ExecuteRelayCall 
*/
