import { useEthereum } from '@/contexts/EthereumContext';

/**
 * Provides a button for connecting to and disconnecting from an
 * Ethereum-based blockchain. It leverages the useEthereum hook
 * from the EthereumContext for managing blockchain connections.
 */

const ConnectButton: React.FC = () => {
  const { connect, disconnect, account } = useEthereum();
  return (
    <button
      className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
      onClick={account ? disconnect : connect}
    >
      {account ? 'Disconnect' : 'Connect'}
    </button>
  );
};

export default ConnectButton;
