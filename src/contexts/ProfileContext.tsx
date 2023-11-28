import React, { createContext, useContext, useState, useEffect } from 'react'
import { useEthereum } from './EthereumContext' // Import your Ethereum context
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js'
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json' assert { type: 'json' }
import { useNetwork } from './NetworkContext'
import supportedNetworks from '../consts/SupportedNetworks.json'

interface Profile {
  name: string
  description: string
  tags: string[]
  links: Link[]
  profileImage: Image[]
  backgroundImage: Image[]
}

interface Link {
  title: string
  url: string
}

interface Image {
  width: number
  height: number
  hashFunction: string
  hash: string
  url: string
}

interface ProfileContextType {
  profile: Profile | null
}

const initialProfileContextValue: ProfileContextType = {
  profile: null,
}

// Set up the empty React context
const ProfileContext = createContext<ProfileContextType>(
  initialProfileContextValue
)

/**
 * Custom hook to use the Profile context across the application.
 *
 * @returns {ProfileContextType} - The profile state containing all properties.
 */
export function useProfile() {
  return useContext(ProfileContext)
}

/**
 * Provider component for the Profile context, handling property checks and
 * maintaining its state during account and chain changes.
 *
 * @param {React.ReactNode} { children } - Child components using the Profile context.
 * @returns {JSX.Element} - The JSX structure that wraps the child components to provide
 *                          access to it's state and functionalities.
 */
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  // State for the Profile provider
  const { account } = useEthereum()
  const { network } = useNetwork()
  const [profile, setProfile] = useState(null)

  // Initialize the profile state and listen for account/chain changes
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!account || !network) {
        setProfile(null)
        return
      }

      // Get the current network properties from the list of supported networks
      const currentNetwork = supportedNetworks.find(
        (net) => net.name === network
      )

      if (!currentNetwork) {
        setProfile(null)
        return
      }

      // Instanciate the LSP3-based smart contract
      const erc725js = new ERC725(
        lsp3ProfileSchema as ERC725JSONSchema[],
        account,
        currentNetwork.rpcUrl,
        { ipfsGateway: currentNetwork.ipfsGateway }
      )

      try {
        // Download and verify the full profile metadata
        const profileMetaData = await erc725js.fetchData('LSP3Profile')
        if (
          profileMetaData.value &&
          typeof profileMetaData.value === 'object' &&
          'LSP3Profile' in profileMetaData.value
        ) {
          // Update the profile state
          setProfile(profileMetaData.value.LSP3Profile)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchProfileData()
  }, [account, network])

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  )
}
