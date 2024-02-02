import { useEthereum } from '@/contexts/EthereumContext';

/**
 * Provides a button for connecting to and disconnecting from an
 * Ethereum-based blockchain. It leverages the useEthereum hook
 * from the EthereumContext for managing blockchain connections.
 */

interface Props {
  connectText: string;
  disconnectText: string;
}

const ConnectButton: React.FC<Props> = ({ connectText, disconnectText }) => {
  const { connect, disconnect, account } = useEthereum();
  return (
    <div>
      {!account ? (
        <button
          className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
          onClick={connect}
        >
          {connectText}
        </button>
      ) : (
        <button
          className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
          onClick={disconnect}
        >
          {disconnectText}
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
