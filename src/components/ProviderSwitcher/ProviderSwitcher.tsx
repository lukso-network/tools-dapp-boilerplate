import React from 'react';

import { useEthereum } from '@/contexts/EthereumContext';

// All supported provider methods
type WalletToolType = 'PlainProvider' | 'Web3Onboard' | 'WalletConnect';

/**
 * Allows developers to switch between all supported provider options:
 * - Plain Provider (window.ethereum & window.lukso)
 * - Web3 Onboard
 * - Wallet Connect
 */
const ProviderSwitcher: React.FC = () => {
  const { walletTool, toggleWalletTool } = useEthereum();

  // Changes the provider if selection is triggered
  const handleProviderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newWalletTool = event.target.value as WalletToolType;
    toggleWalletTool(newWalletTool);
  };

  const providerOptions: { name: WalletToolType; displayName: string }[] = [
    { name: 'PlainProvider', displayName: 'Plain Injection' },
    { name: 'Web3Onboard', displayName: 'Web3-Onboard' },
    { name: 'WalletConnect', displayName: 'Wallet Connect' },
  ];

  return (
    <select
      name="network"
      value={walletTool} // TODO
      onChange={handleProviderChange}
      className="m-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none"
    >
      {providerOptions.map((option) => (
        <option key={option.name} value={option.name}>
          {option.displayName}
        </option> // Renders supported providers
      ))}
    </select>
  );
};

export default ProviderSwitcher;
