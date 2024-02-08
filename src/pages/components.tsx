import ConnectButton from '@/components/ConnectButton';
import NetworkSwitcher from '@/components/NetworkSwitcher/NetworkSwitcher';
import ProfilePreview from '@/components/ProfilePreview';
import SignInButton from '@/components/SignInButton';

/**
 * Displays the contents of the components page within the app.
 */
export default function Components() {
  return (
    <>
      <div className="home-background">
        <div className="flex items-center justify-center main-content">
          <div>
            <div className="elementDescription">
              <div className="opacity-70">ConnectButton.tsx</div>
              <div className="elementBox">
                <ConnectButton />
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
          </div>
        </div>
      </div>
    </>
  );
}
