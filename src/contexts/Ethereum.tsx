// contexts/EthereumContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'

interface EthereumContextType {
  provider: any
  account: string | null
  connect: () => Promise<void>
}

const defaultValue: EthereumContextType = {
  provider: null,
  account: null,
  connect: async () => {},
}

const EthereumContext = createContext<EthereumContextType>(defaultValue)

export function useEthereum() {
  return useContext(EthereumContext)
}

export function EthereumProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  const connect = async () => {
    if (!provider) {
      console.log('Provider is not set')
      return
    }
    try {
      const accounts = await provider.send('eth_requestAccounts', [])
      setAccount(accounts[0])
    } catch (error) {
      console.log('no accounts given')
    }
  }

  return (
    <EthereumContext.Provider value={{ provider, account, connect }}>
      {children}
    </EthereumContext.Provider>
  )
}
