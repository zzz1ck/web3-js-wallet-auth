import React from 'react';

interface WalletInterface {
  error: string;
  setError: (error: string) => void;
  address: string;
  setAddress: (address: string) => void;
  account: string;
  setAccount: (account: string) => void;
  balance: string;
  setBalance: (balance: string) => void;
  cleanup: () => void;
}

interface WalletProviderInterface {
  children: React.ReactNode;
  walletController: WalletInterface;
}

export const useWalletController = () => {
  const [error, setError] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [account, setAccount] = React.useState<string>('');
  const [balance, setBalance] = React.useState<string>('');

  const walletCtx: WalletInterface = React.useMemo(
    () => ({
      error,
      setError,
      address,
      setAddress,
      account,
      setAccount,
      balance,
      setBalance,
      cleanup: () => {
        setError('');
        setAccount('');
        setAddress('');
        setBalance('');
      },
    }),
    [error, setError, address, setAddress, account, setAccount, balance, setBalance]
  );

  return walletCtx;
};

export const Wallet =
  React.createContext<WalletInterface | null>(null);

export const WalletProvider = ({
  children,
  walletController,
}: WalletProviderInterface) => {
  return (
    <Wallet.Provider value={walletController}>{children}</Wallet.Provider>
  );
};

export const useWallet = () => {
  return React.useContext(Wallet);
};
