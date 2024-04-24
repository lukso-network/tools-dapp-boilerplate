import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json' assert { type: 'json' };
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';

import supportedNetworks from '@/consts/SupportedNetworks.json';
import { useEthereum } from './EthereumContext';
import { useNetwork } from './NetworkContext';

interface Profile {
  name: string;
  description: string;
  tags: string[];
  links: Link[];
  profileImage: Image[];
  backgroundImage: Image[];
}

interface Link {
  title: string;
  url: string;
}

interface Image {
  width: number;
  height: number;
  hashFunction: string;
  hash: string;
  url: string;
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  issuedAssets: string[];
}

const initialProfileContextValue: ProfileContextType = {
  profile: null,
  setProfile: () => {},
  issuedAssets: [],
};

// Set up the empty React context
const ProfileContext = createContext<ProfileContextType>(
  initialProfileContextValue
);

/**
 * Custom hook to use the Profile context across the application.
 *
 * @returns {ProfileContextType} - The profile state containing all properties.
 */
export function useProfile() {
  return useContext(ProfileContext);
}

/**
 * Provider component for the Profile context, handling property checks and
 * maintaining its state during account and chain changes.
 *
 * @param children - Child components using the Profile context.
 */
export function ProfileProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // State for the Profile provider
  const { account } = useEthereum();
  const { network } = useNetwork();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [issuedAssets, setIssuedAssets] = useState<string[]>([]);

  // Load profile from local storage on initial render
  useEffect(() => {
    const loadProfileFromLocalStorage = () => {
      const storedProfileData = localStorage.getItem('profileData');
      return storedProfileData ? JSON.parse(storedProfileData) : null;
    };

    const storedProfile = loadProfileFromLocalStorage();
    if (storedProfile && storedProfile.account === account) {
      setProfile(storedProfile.data);
    } else {
      // Reset profile if account has changed
      setProfile(null);
    }
  }, [account]);

  // Save profile to local storage whenever it changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem(
        'profileData',
        JSON.stringify({ account, data: profile })
      );
    }
  }, [profile, account]);

  // Fetch and update profile data from blockchain
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!account || !network) {
        setProfile(null);
        return;
      }

      // Get the current network properties from the list of supported networks
      const currentNetwork = supportedNetworks.find(
        (net) => net.name === network
      );

      if (!currentNetwork) {
        setProfile(null);
        return;
      }

      // Instanciate the LSP3-based smart contract
      const erc725js = new ERC725(
        lsp3ProfileSchema as ERC725JSONSchema[],
        account,
        currentNetwork.rpcUrl,
        { ipfsGateway: currentNetwork.ipfsGateway }
      );

      try {
        // Download and verify the full profile metadata
        const profileMetaData = await erc725js.fetchData('LSP3Profile');
        const lsp12IssuedAssets = await erc725js.fetchData(
          'LSP12IssuedAssets[]'
        );

        if (
          profileMetaData.value &&
          typeof profileMetaData.value === 'object' &&
          'LSP3Profile' in profileMetaData.value
        ) {
          // Update the profile state
          setProfile(profileMetaData.value.LSP3Profile);
        }

        if (lsp12IssuedAssets.value && Array.isArray(lsp12IssuedAssets.value)) {
          // Update the issued assets state
          setIssuedAssets(lsp12IssuedAssets.value);
        }
      } catch (error) {
        console.log('Can not fetch profile data: ', error);
      }
    };

    fetchProfileData();
  }, [account, network]);

  /*
   * Accessible context properties
   * that only update on changes
   */
  const contextProperties = useMemo(
    () => ({
      profile,
      setProfile,
      issuedAssets,
    }),
    [profile, setProfile, issuedAssets]
  );

  return (
    <ProfileContext.Provider value={contextProperties}>
      {children}
    </ProfileContext.Provider>
  );
}
