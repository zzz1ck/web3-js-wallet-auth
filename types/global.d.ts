import { providers } from 'ethers';

declare global {
  type EthereumProvider = providers.ExternalProvider & {
    on?: (eventName: string, listener: () => void) => void;
    removeListener?: (eventName: string, listener: () => void) => void;
  };
  interface Window {
    ethereum: EthereumProvider;
  }
}
