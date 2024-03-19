import { ethers } from 'ethers';

import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import LSP12Schema from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';

import { useEthereum } from '@/contexts/EthereumContext';
import { useNetwork } from '@/contexts/NetworkContext';
import { useProfile } from '@/contexts/ProfileContext';

import supportedNetworks from '@/consts/SupportedNetworks.json';
import { supportsInterface } from '@/utils/interfaceDetection';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/dist/constants.cjs.js';

import { useEffect, useState } from 'react';

/**
 * Allows a user to register assets to their Universal Profile. It uses the useEthereum
 * and useNetwork hooks to fetch account and network data, and the useProfile hook to
 * fetch the user's issued assets.
 *
 * The component maintains state for the new asset being registered, all assets, and
 * the current transaction. It provides an input for the user to enter an asset address,
 * and buttons to add the asset to the list and to register all assets.
 *
 * The "Set LSP12IssuedAssets" button creates an instance of the ERC725 contract and
 * encodes the transaction data. It then calls the setDataBatch method on the Universal
 * Profile contract to register the assets.
 *
 * The component displays a list of all assets, and if a transaction is in progress,
 * it displays a processing message. If a transaction receipt is available, it displays
 * the receipt.
 */

const AssetRegistration: React.FC = () => {
  const { account, provider } = useEthereum();
  const { network } = useNetwork();
  const { issuedAssets } = useProfile();
  const [newAsset, setNewAsset] = useState<string>('');
  const [allAssets, setAllAssets] = useState<string[]>([]);
  const [transaction, setTransaction] = useState({
    processing: false,
    receipt: null,
    receiptLink: '#',
  });

  useEffect(() => {
    // Filter out assets that are already registered
    const currentAssetAddresses = issuedAssets || [];
    setAllAssets((allAssets) => {
      const filteredAssets = currentAssetAddresses.filter(
        (asset: string) => !allAssets.includes(asset)
      );
      return [...filteredAssets, ...allAssets];
    });
  }, [issuedAssets]);

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

    // check if the asset is LSP7 or LSP8
    const checkStandard = async (asset: string) => {
      const isLSP7 = await supportsInterface(
        asset,
        INTERFACE_IDS.LSP7DigitalAsset
      );
      const isLSP8 = await supportsInterface(
        asset,
        INTERFACE_IDS.LSP8IdentifiableDigitalAsset
      );
      return isLSP7
        ? INTERFACE_IDS.LSP7DigitalAsset
        : isLSP8
          ? INTERFACE_IDS.LSP8IdentifiableDigitalAsset
          : false;
    };

    // encode transaction data
    const issuedAssetMap: {
      keyName: string;
      dynamicKeyParts: string;
      value: string[];
    }[] = await Promise.all(
      allAssets.map(async (asset: string, index: number) => {
        const assetInterface = await checkStandard(asset);

        return {
          keyName: 'LSP12IssuedAssetsMap:<address>',
          dynamicKeyParts: asset,
          value: [assetInterface, ERC725.encodeValueType('uint128', index)],
        };
      }, [])
    );

    const { keys: lsp12DataKeys, values: lsp12Values } = erc725.encodeData([
      {
        keyName: 'LSP12IssuedAssets[]',
        value: allAssets,
      },
      ...issuedAssetMap,
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
        const explorerLink = currentNetwork
          ? `${currentNetwork.explorer}tx/${tx.hash}`
          : '#';
        setTransaction({
          processing: false,
          receipt: tx.hash,
          receiptLink: explorerLink,
        });
      })
      .catch((error: any) => {
        setTransaction({ ...transaction, processing: false });
        console.error(error);
      });
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
          value={newAsset}
          onChange={(e) => setNewAsset(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <button
            className={
              !allAssets.length
                ? 'm-2 bg-gray-300 text-gray-400 font-bold py-2 px-4 rounded cursor-not-allowed'
                : 'm-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded'
            }
            onClick={() => {
              registerAssets();
            }}
          >
            Set LSP12IssuedAsset
          </button>
          <button
            className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setAllAssets([...allAssets, newAsset]);
              setNewAsset('');
            }}
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
