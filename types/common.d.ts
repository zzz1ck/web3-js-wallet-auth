import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';

declare global {
  type EthereumProvider = ExternalProvider & {
    on?: (eventName: string, listener: () => void) => void;
    removeListener?: (eventName: string, listener: () => void) => void;
  };
  interface Window {
    ethereum: EthereumProvider;
  }
  interface WithChildren {
    children: React.ReactNode;
  }
}
