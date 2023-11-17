import { useEthereum } from '../../contexts/Ethereum'

function ConnectButton() {
  const { connect, account } = useEthereum()

  return (
    <div>
      {!account && (
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          onClick={connect}
        >
          Connect Extension
        </button>
      )}
      {account && <p>Connected with: {account}</p>}
    </div>
  )
}

export default ConnectButton
