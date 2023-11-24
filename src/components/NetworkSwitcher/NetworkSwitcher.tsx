import React from 'react'
import { useNetwork } from '../../contexts/NetworkContext'
import supportedNetworks from '../../consts/SupportedNetworks.json'

function NetworkSwitcher() {
  const { network, switchNetwork } = useNetwork()

  const handleNetworkChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedNetworkName = event.target.value
    const selectedNetwork = supportedNetworks.find(
      (net) => net.name === selectedNetworkName
    )
    if (selectedNetwork) {
      await switchNetwork(selectedNetwork.chainId)
    }
  }

  return (
    <select
      value={network ?? ''}
      onChange={handleNetworkChange}
      className="m-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none"
    >
      {supportedNetworks.map((net) => (
        <option key={net.chainId} value={net.name}>
          {net.name}
        </option>
      ))}
    </select>
  )
}

export default NetworkSwitcher
