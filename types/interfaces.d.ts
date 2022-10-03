import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';

declare global {
  interface Window {
    ethereum: ExternalProvider & {
      on?: (eventName: string, listener: () => void) => void;
      removeListener?: (eventName: string, listener: () => void) => void;
    };
  }
  interface WithChildren {
    children: React.ReactNode;
  }
}
