/**
 * Global imports and interfaces for TypeScript.
 */
interface Window {
  ethereum: any;
  lukso: any;
}

// Ethereum Context properties
interface AccountData {
  account: string | null
  isVerified: boolean
}
