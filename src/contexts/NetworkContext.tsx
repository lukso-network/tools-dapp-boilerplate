import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import supportedNetworks from '../consts/SupportedNetworks.json'

interface NetworkContextType {
  network: string | null
  switchNetwork: (networkId: string) => Promise<void>
}

const defaultValue: NetworkContextType = {
  network: null,
  switchNetwork: async () => {},
}

const NetworkContext = createContext<NetworkContextType>(defaultValue)

export function useNetwork() {
  return useContext(NetworkContext)
}

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetwork] = useState<string | null>(null)

  const isNetworkSupported = (chainId: bigint) => {
    return supportedNetworks.some((net) => BigInt(net.chainId) === chainId)
  }

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)

      provider.getNetwork().then((net) => {
        if (isNetworkSupported(net.chainId)) {
          const networkDetails = supportedNetworks.find(
            (network) => BigInt(network.chainId) === net.chainId
          )
          if (networkDetails) {
            setNetwork(networkDetails.name)
          }
        } else {
          console.log('Unsupported network')
        }
      })

      window.ethereum.on('chainChanged', (chainId: bigint) => {
        if (isNetworkSupported(chainId)) {
          const networkDetails = supportedNetworks.find(
            (network) => BigInt(network.chainId) === chainId
          )
          if (networkDetails) setNetwork(networkDetails.name)
        } else {
          console.log('Unsupported network')
        }
        window.location.reload()
      })
    }
  }, [])

  const switchNetwork = async (networkId: string) => {
    if (window.ethereum) {
      const networkDetails = supportedNetworks.find(
        (net) => net.chainId === networkId
      )

      if (!networkDetails) {
        console.log('Network details not found for chainId:', networkId)
        return
      }
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + BigInt(networkId).toString(16) }],
        })
        setNetwork(networkDetails.name)
      } catch (error) {
        if (error instanceof Error && 'code' in error) {
          const switchError = error as { code: number }
          // Chain has not been added yet.
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x' + BigInt(networkDetails.chainId).toString(16),
                    chainName: networkDetails.name,
                    rpcUrls: [networkDetails.rpcUrl],
                  },
                ],
              })
            } catch (addError) {
              console.log('User denied adding the network:', addError)
            }
          }
        } else {
          console.log('User denied switching network:', error)
        }
      }
    }
  }

  return (
    <NetworkContext.Provider value={{ network, switchNetwork }}>
      {children}
    </NetworkContext.Provider>
  )
}
