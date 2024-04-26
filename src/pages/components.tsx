import ConnectButton from '@/components/ConnectButton';
import NetworkSwitcher from '@/components/NetworkSwitcher/NetworkSwitcher';
import ProfilePreview from '@/components/ProfilePreview';
import AssetRegistration from '@/components/AssetRegistration';
import SignInButton from '@/components/SignInButton';
import ProviderSwitcher from '@/components/ProviderSwitcher';

/**
 * Displays the contents of the components page within the app.
 */
export default function Components() {
  return (
    <div className="flex items-center justify-center main-content mt-6">
      <div>
        <div className="elementDescription">
          <div className="opacity-70">ConnectButton.tsx</div>
          <div className="elementBox">
            <ConnectButton />
          </div>
          <div className="elementDescription">
            <div className="opacity-70">ProviderSwitcher.tsx</div>
            <div className="elementBox">
              <ProviderSwitcher />
            </div>
          </div>
        </div>
        <div className="elementDescription">
          <div className="opacity-70">SignInButton.tsx</div>
          <div className="elementBox">
            <SignInButton />
          </div>
        </div>
        <div className="elementDescription">
          <div className="opacity-70">NetworkSwitcher.tsx</div>
          <div className="elementBox">
            <NetworkSwitcher />
          </div>
        </div>
      </div>
      <div>
        <div className="elementDescription">
          <div className="opacity-70">ProfilePreview.tsx</div>
          <div className="elementBox">
            <ProfilePreview />
          </div>
        </div>
        <div className="elementDescription">
          <div className="opacity-70">AssetRegistration.tsx</div>
          <div className="elementBox">
            <AssetRegistration />
          </div>
        </div>
      </div>
    </div>
  );
}
