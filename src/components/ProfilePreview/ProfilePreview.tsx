import React from 'react';
import Image from 'next/image';

import identicon from 'ethereum-blockies-base64';

import { useProfile } from '@/contexts/ProfileContext';
import { useEthereum } from '@/contexts/EthereumContext';
import styles from './ProfilePreview.module.css';

/**
 * Displays the user's profile information including images,
 * name, account address, description, and tags. The component
 * uses the useProfile and useEthereum hooks to fetch profile
 * and account data, respectively.
 */
const ProfilePreview: React.FC = () => {
  const { profile } = useProfile();
  const { account } = useEthereum();
  const identiconUrl = account ? identicon(account) : '';

  return (
    <div
      className={`${styles.profileContainer} relative bg-white rounded-lg shadow-lg p-4 mx-auto`}
    >
      {profile?.backgroundImage && profile.backgroundImage.length > 0 && (
        <Image
          src={profile.backgroundImage[0].url.replace(
            'ipfs://',
            'https://api.universalprofile.cloud/ipfs/'
          )}
          alt="Background"
          className={`${styles.profileBackground} rounded-lg absolute inset-0`}
          fill
          sizes="(max-width: 432px) 100vw"
          style={{
            objectFit: 'cover',
          }}
        /> // Background image
      )}

      <div className="flex justify-center relative">
        <div
          className={`${styles.profileImage} w-24 h-24 bg-gray-200 rounded-full overflow-hidden relative border-4 border-white`}
        >
          {!profile?.profileImage || profile.profileImage.length === 0 ? (
            <div className="w-full h-full bg-gray-300 rounded-full"></div> // Show grey background if there is no image
          ) : (
            <Image
              src={profile.profileImage[0].url.replace(
                'ipfs://',
                'https://api.universalprofile.cloud/ipfs/'
              )}
              alt="Profile"
              className="rounded-full"
              fill
              sizes="(max-width: 768px) 100vw"
              priority={true}
              style={{
                objectFit: 'cover',
              }}
            /> // Profile Image
          )}
        </div>
        <div
          className={`${styles.blockie} mb-6 mr-6 bg-gray-200 rounded-full overflow-hidden border-4 border-white`}
        >
          {!profile?.profileImage ||
          profile.profileImage.length === 0 ||
          !identiconUrl ? (
            <div className="w-full h-full bg-gray-300 rounded-full"></div> // Show grey background if there is no image
          ) : (
            <Image
              src={identiconUrl}
              alt="Blockie"
              className="rounded-full"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            /> // Identicon
          )}
        </div>
      </div>

      <div
        className={`${styles.profileData} text-center mt-4 bg-white p-2 rounded-lg relative`}
      >
        <p className="text-lg font-semibold">{profile?.name || 'Anonymous'}</p>
        <p className="text-sm text-gray-600">{account || '0x'}</p>
        {profile?.description ? (
          <p className="text-sm text-gray-500 mt-2">{profile?.description}</p>
        ) : (
          <div
            className={`${styles.emptyDescription} w-full bg-gray-300 mt-2 rounded-lg`}
          ></div> // Profile Description
        )}

        {profile?.tags && (
          <div className="flex justify-center mt-2">
            {profile.tags.map((tag, index) => (
              <a
                key={`${tag}-${index}`}
                className=" my-1 bg-pink-200 text-pink-800 rounded-full px-2 py-1 mx-1 text-xs"
              >
                {tag}
              </a>
            ))}
          </div> // Profile Tags
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;
