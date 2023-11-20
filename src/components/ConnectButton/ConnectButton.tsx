import { useNetwork } from '@/contexts/NetworkContext'
import { useEthereum } from '../../contexts/EthereumContext'

function ConnectButton() {
  const { connect, disconnect, account } = useEthereum()

  return (
    <div>
      {!account ? (
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          onClick={connect}
        >
          Connect Extension
        </button>
      ) : (
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          onClick={disconnect}
        >
          Disconnect
        </button>
      )}
    </div>
  )
}

export default ConnectButton
