import React from 'react';

interface WalletInterface {
  error: string;
  setError: (error: string) => void;
  account: string;
  setAccount: (account: string) => void;
  balance: string;
  setBalance: (balance: string) => void;
  cleanup: () => void;
}
interface WalletProviderInterface extends React.PropsWithChildren {
  walletController: WalletInterface;
}

export const useWalletController = () => {
  const [error, setError] = React.useState<string>('');
  const [account, setAccount] = React.useState<string>('');
  const [balance, setBalance] = React.useState<string>('');

  const walletCtx: WalletInterface = React.useMemo(
    () => ({
      error,
      setError,
      account,
      setAccount,
      balance,
      setBalance,
      cleanup: () => {
        setError('');
        setAccount('');
        setBalance('');
      },
    }),
    [error, setError, account, setAccount, balance, setBalance],
  );

  return walletCtx;
};

export const Wallet = React.createContext({} as WalletInterface);

export function WalletProvider({
  children,
  walletController,
}: WalletProviderInterface) {
  return (
    <Wallet.Provider value={walletController}>{children}</Wallet.Provider>
  );
}

export const useWallet = () => React.useContext(Wallet);
