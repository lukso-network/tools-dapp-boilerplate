import { ethers } from 'ethers';

import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import LSP12Schema from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';

import { useEthereum } from '@/contexts/EthereumContext';
import { useNetwork } from '@/contexts/NetworkContext';
import { useProfile } from '@/contexts/ProfileContext';

import supportedNetworks from '@/consts/SupportedNetworks.json';
import { supportsInterface } from '@/utils/interfaceDetection';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants';

import { useEffect, useState } from 'react';

/**
 * Allows users to register assets to their Universal Profile using the LSP12 Issued Assets standard.
 * LSP12 provides a standardized way to keep track of assets issued by a smart contract,
 * addressing the challenge of verifying asset authenticity.
 *
 * LSP12IssuedAssets standardizes metadata keys in ERC725Y smart contracts,
 * enabling the recording of issued assets' addresses and associated interface IDs.
 *
 * This component facilitates asset registration by fetching account and network data
 * and managing state for new assets, ongoing transactions, and asset lists.
 *
 * It integrates with the Universal Profile contract, leveraging ERC725 and ERC165 interfaces
 * to encode transaction data and register assets securely.
 *
 * Docs: https://docs.lukso.tech/standards/universal-profile/lsp12-issued-assets/
 */

const AssetRegistration: React.FC = () => {
  const { account, provider } = useEthereum();
  const { network } = useNetwork();
  const { issuedAssets } = useProfile();
  const [inputAsset, setInputAsset] = useState<string>('');
  const [issuedAssetsUpdated, setIssuedAssetsUpdated] = useState(false);
  const [allAssets, setAllAssets] = useState<string[]>([]);
  const [newAssets, setNewAssets] = useState<string[]>([]);
  const [transaction, setTransaction] = useState({
    processing: false,
    receipt: null,
    receiptLink: '#',
  });

  useEffect(() => {
    // Get issuedAssets and check for duplicates
    const currentAssetAddresses = issuedAssets || [];
    const uniqueAssets = Array.from(new Set(currentAssetAddresses));
    setAllAssets(uniqueAssets);
  }, [issuedAssets, account]);

  // Check if the asset is LSP7 or LSP8
  const checkStandard = async (asset: string) => {
    const isLSP7 = await supportsInterface(
      asset,
      INTERFACE_IDS.LSP7DigitalAsset
    );
    const isLSP8 = await supportsInterface(
      asset,
      INTERFACE_IDS.LSP8IdentifiableDigitalAsset
    );

    if (isLSP7) {
      return INTERFACE_IDS.LSP7DigitalAsset;
    }
    if (isLSP8) {
      return INTERFACE_IDS.LSP8IdentifiableDigitalAsset;
    }
    return false;
  };

  const registerAssets = async () => {
    if (!account) {
      console.error('Please connect wallet.');
      return;
    }

    const currentNetwork = supportedNetworks.find(
      (net) => net.name === network
    );

    // create ERC725 instance
    const erc725 = new ERC725(
      LSP12Schema as ERC725JSONSchema[],
      account,
      currentNetwork?.rpcUrl,
      { ipfsGateway: currentNetwork?.ipfsGateway }
    );

    // Encode transaction data of new assets
    const newIssuedAssetMap: {
      keyName: string;
      dynamicKeyParts: string;
      value: string[];
    }[] = await Promise.all(
      newAssets.map(async (asset, index) => {
        const assetInterface = await checkStandard(asset);

        return {
          keyName: 'LSP12IssuedAssetsMap:<address>',
          dynamicKeyParts: asset,
          value: [
            assetInterface,
            ERC725.encodeValueType('uint128', allAssets.length + index),
          ],
        };
      }, [])
    );

    const { keys: lsp12DataKeys, values: lsp12Values } = erc725.encodeData([
      {
        keyName: 'LSP12IssuedAssets[]',
        value: newAssets,
        startingIndex: allAssets.length,
        totalArrayLength: allAssets.length + newAssets.length,
      },
      ...newIssuedAssetMap,
    ]);

    const signer = await provider?.getSigner();

    // Universal Profile Contract Instance
    const myUniversalProfileContract = new ethers.Contract(
      account,
      UniversalProfileContract.abi,
      signer
    );

    setTransaction({ ...transaction, processing: true });

    myUniversalProfileContract
      .setDataBatch(lsp12DataKeys, lsp12Values)
      .then((tx: any) => {
        // Reset new asset list
        setNewAssets([]);
        const explorerLink = currentNetwork
          ? `${currentNetwork.explorer}tx/${tx.hash}`
          : '#';
        setTransaction({
          processing: false,
          receipt: tx.hash,
          receiptLink: explorerLink,
        });
        setIssuedAssetsUpdated(false);
      })
      .catch((error: any) => {
        setTransaction({ ...transaction, processing: false });
        console.error(error);
      });
  };

  const handleAddAsset = async () => {
    if (!allAssets.includes(inputAsset.trim())) {
      // Check if the asset already exists in the array to prevent duplicates
      const assetStandard = await checkStandard(inputAsset.trim());
      // Check if the input is an address of LSP7 or LSP8
      if (assetStandard) {
        setTransaction({ ...transaction, receipt: null });
        setNewAssets([...newAssets, inputAsset.trim()]);
        setAllAssets([...allAssets, inputAsset.trim()]);
        setInputAsset('');
        setIssuedAssetsUpdated(true);
      } else {
        console.log('Only LSP7 or LSP8 assets can be added.');
      }
    } else {
      console.log('Asset already exists.');
    }
    setInputAsset('');
  };

  const { processing, receipt, receiptLink } = transaction;

  return (
    <div className="max-w-[432px] flex flex-col justify-center items-center">
      <div className="flex flex-col">
        {allAssets.map((asset) => (
          <div key={asset}>{asset}</div>
        ))}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-[420px] bg-gray-200 text-gray-700 font-bold my-2 p-2 rounded"
          type="text"
          id="asset"
          name="asset"
          placeholder="Asset Address"
          value={inputAsset}
          onChange={(e) => setInputAsset(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <button
            className={
              !issuedAssetsUpdated
                ? 'm-2 bg-gray-300 text-gray-400 font-bold py-2 px-4 rounded cursor-not-allowed'
                : 'm-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded'
            }
            onClick={() => {
              if (issuedAssetsUpdated) registerAssets();
            }}
          >
            Set LSP12IssuedAsset
          </button>
          <button
            className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
            onClick={handleAddAsset}
          >
            Add
          </button>
        </div>
      </form>
      {receipt && (
        <div className="w-full min-w-0 flex justify-center items-center">
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href={receiptLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Show receipt on explorer
            <svg
              className="svg-icon w-6 h-6 inline align-middle overflow-hidden mb-2"
              style={{ fill: 'currentColor' }}
              viewBox="0 0 1024 1024"
            >
              <path d="M768 300.8a42.667 42.667 0 0 0-42.667-42.667L384 256a42.667 42.667 0 0 0 0 85.333h237.227L268.373 695.04a42.667 42.667 0 0 0 0 60.587 42.667 42.667 0 0 0 60.587 0L682.667 401.92V640a42.667 42.667 0 0 0 42.666 42.667A42.667 42.667 0 0 0 768 640z" />
            </svg>
          </a>
        </div>
      )}
      {processing && <p>{'Processing . . .'}</p>}
    </div>
  );
};

export default AssetRegistration;
