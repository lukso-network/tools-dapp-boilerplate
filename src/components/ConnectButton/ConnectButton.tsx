import { useEthereum } from '../../contexts/EthereumContext'

/**
 * Provides a button for connecting to and disconnecting from an
 * Ethereum-based blockchain. It leverages the useEthereum hook
 * from the EthereumContext for managing blockchain connections.
 *
 * @returns {JSX.Element} - A JSX structure of the button
 */
function ConnectButton() {
  const { connect, disconnect, account } = useEthereum()

  return (
    <div>
      {!account ? (
        <button
          className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
          onClick={connect}
        >
          Connect Extension
        </button>
      ) : (
        <button
          className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
          onClick={disconnect}
        >
          Disconnect
        </button>
      )}
    </div>
  )
}

export default ConnectButton
