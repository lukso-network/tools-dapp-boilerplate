import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';

/*
 * Initialize base provider to get current blockchain network
 * The RPC URL can also be passed as string manually, see:
 * https://docs.lukso.tech/tools/erc725js/getting-started
 */
const providerObject = window.lukso || window.ethereum;
const provider = providerObject
  ? new ethers.BrowserProvider(providerObject)
  : null;
/**
 * Checks if a smart contract supports a specific ERC725Y data key.
 *
 * @param contractAddress smart contract to call.
 * @param schema schema of the ERC725Y storage value.
 * @param key standardized name of the ERC725Y data key.
 * @returns true if data key was detected.
 */
export async function supportsMetadata(
  contractAddress: string,
  schema: any,
  key: string
): Promise<boolean> {
  if (!provider) {
    console.error('Provider not available.');
    return false;
  }
  const erc725 = new ERC725(schema, contractAddress, provider, {});

  try {
    const data = await erc725.getData(key);
    return data.value !== null;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return false;
  }
}

// HOW TO USE:
// import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json'
// const hasLSP3data = await supportsMetadata(contractAddress, lsp3ProfileSchema, 'SupportedStandards:LSP3Profile')

/*
Supported schemas from erc725.js library:

LSP1UniversalReceiverDelegate       LSP3ProfileMetadata
LSP4DigitalAsset                    LSP5ReceivedAssets
LSP6KeyManager                      LSP8IdentifiableDigitalAsset
LSP9Vault                           LSP10ReceivedVaults
LSP12IssuedAssets                   LSP17ContractExtension

All fetchable keys can be found within @erc725/erc725.js/schemas/[schema].json
*/
