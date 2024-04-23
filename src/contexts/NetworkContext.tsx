import React, { createContext, useContext, useState, useEffect } from 'react';

import supportedNetworks from '@/consts/SupportedNetworks.json';
import { useEthereum } from './EthereumContext';
interface NetworkContextType {
  network: string | null;
  switchNetwork: (networkId: string) => Promise<void>;
}

const defaultValue: NetworkContextType = {
  network: null,
  switchNetwork: async () => {},
};

// Set up the empty React context
const NetworkContext = createContext<NetworkContextType>(defaultValue);

/**
 * Custom hook to use the Network context across the application.
 *
 * @returns {NetworkContextType} - The network state and switchNetwork function.
 */
export function useNetwork() {
  return useContext(NetworkContext);
}

/**
 * Provider component for the Network context, handling network support checks and
 * maintaining its state during network changes.
 *
 * @param children - components using the Network context.
 */
export function NetworkProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Gloabl provider object
  const { provider } = useEthereum();

  // State for the Network provider
  const [network, setNetwork] = useState<string | null>(null);

  // Checks if the given chain ID is in the list of supported networks
  const isNetworkSupported = (chainId: bigint) => {
    return supportedNetworks.some((net) => BigInt(net.chainId) === chainId);
  };

  // Initialize the network state and listen for chain changes
  useEffect(() => {
    /*
     * Check if global provider is set up
     * and base window objects can be called
     */
    if (provider) {
      provider.getNetwork().then((net) => {
        if (isNetworkSupported(net.chainId)) {
          const networkDetails = supportedNetworks.find(
            (network) => BigInt(network.chainId) === net.chainId
          );
          if (networkDetails) {
            setNetwork(networkDetails.name);
          }
        }
      });

      // Fallback to base provider object for event listening
      const providerObject = window.lukso || window.ethereum;

      providerObject.on('chainChanged', (chainId: bigint) => {
        if (isNetworkSupported(chainId)) {
          const networkDetails = supportedNetworks.find(
            (network) => BigInt(network.chainId) === chainId
          );
          if (networkDetails) setNetwork(networkDetails.name);
        } else {
          console.log('Unsupported network');
        }
        // Reload the page when the chain changes
        window.location.reload();
      });
    }
  }, [provider]);

  // Change to a different Ethereum network
  const switchNetwork = async (networkId: string) => {
    /*
     * Check if global provider is set up
     * and base window objects can be called
     */
    if (provider) {
      // Seach for supported network ID
      const networkDetails = supportedNetworks.find(
        (net) => net.chainId === networkId
      );

      if (!networkDetails) {
        console.log('Network details not found for chainId:', networkId);
        return;
      }

      // Fallback to base provider object for extension requests
      const providerObject = window.lukso || window.ethereum;

      // If network is already set up within the extension, switch
      try {
        await providerObject.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + BigInt(networkId).toString(16) }],
        });
        setNetwork(networkDetails.name);
      } catch (error) {
        if (error instanceof Error && 'code' in error) {
          const switchError = error as { code: number };
          // If network has not been added yet, add it to the extension
          if (switchError.code === 4902) {
            try {
              await providerObject.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x' + BigInt(networkDetails.chainId).toString(16),
                    chainName: networkDetails.name,
                    rpcUrls: [networkDetails.rpcUrl],
                  },
                ],
              });
            } catch (addError) {
              console.log('User denied adding the network:', addError);
            }
          }
        } else {
          console.log('User denied switching network:', error);
        }
      }
    }
  };

  return (
    <NetworkContext.Provider value={{ network, switchNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}
