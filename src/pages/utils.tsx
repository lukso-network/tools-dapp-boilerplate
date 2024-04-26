/**
 * Displays the contents of the utility page within the app.
 */
export default function Utility() {
  return (
    <div className="flex flex-col items-center justify-center main-content">
      <h1 className="text-2xl">Built-in Utility Tools:</h1>
      <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-4">
        <h4 className="text-xl mb-2 font-bold">🔎 Interface Detection</h4>
        <div className="mb-32 lg:mb-0 lg:max-w-2xl opacity-70 text-sm">
          You can use the
          <code className="font-bold ml-1">supportsInterface()</code> function
          within
          <code className="font-bold mx-1">
            src/utils/interfaceDetection.ts
          </code>
          to quickly check ERC615 interface IDs of LSP smart contracts you are
          interacting with.
        </div>
      </div>
      <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-4">
        <h4 className="text-xl mb-2 font-bold">🗂️ Metadata Detection</h4>
        <div className="mb-32 lg:mb-0 lg:max-w-2xl opacity-70 text-sm">
          You can use the
          <code className="font-bold mx-1">supportsMetadata()</code> function
          within
          <code className="font-bold mx-1">
            src/utils/metadataDetection.ts
          </code>{' '}
          to quickly check ERC725Y data keys of LSP smart contracts you are
          interacting with.
        </div>
      </div>
      <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-4">
        <h4 className="text-xl mb-2 font-bold">🔑 Sign In With Ethereum</h4>
        <div className="mb-32 lg:mb-0 lg:max-w-2xl opacity-70 text-sm">
          You can use the
          <code className="font-bold mx-1">signInWithEthereum()</code>
          function within
          <code className="font-bold mx-1">
            src/utils/signInWithEthereum.ts
          </code>
          to quickly prove ownership over the account that you are connected
          with.
        </div>
      </div>
    </div>
  );
}
