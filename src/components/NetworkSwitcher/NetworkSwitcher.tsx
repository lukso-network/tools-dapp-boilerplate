import React from 'react';

import { useNetwork } from '@/contexts/NetworkContext';
import supportedNetworks from '@/consts/SupportedNetworks.json';

/**
 * Allows users to switch between different Ethereum networks.
 * The component uses the useNetwork hook for network state and
 * switchNetwork function.
 */
const NetworkSwitcher: React.FC = () => {
  const { network, switchNetwork } = useNetwork();

  // Changes the network if selection is triggered
  const handleNetworkChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedNetworkName = event.target.value;
    const selectedNetwork = supportedNetworks.find(
      (net) => net.name === selectedNetworkName
    );
    if (selectedNetwork) {
      await switchNetwork(selectedNetwork.chainId);
    }
  };

  return (
    <select
      name="network"
      value={network ?? ''}
      onChange={handleNetworkChange}
      className="m-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none"
    >
      {supportedNetworks.map((net) => (
        <option key={net.chainId} value={net.name}>
          {net.name}
        </option> // Renders supported networks defined within SupportedNetworks.json
      ))}
    </select>
  );
};

export default NetworkSwitcher;
