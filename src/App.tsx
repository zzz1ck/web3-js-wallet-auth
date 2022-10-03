import React from 'react';
import { ethers } from 'ethers';
import { EthereumApi, WalletDetailsType } from './api/eth';
import { Button, MetaMaskButton, Pulse, Sizes } from './components';
import { WalletProvider, useWalletController } from './contexts/wallet';

const App = () => {
  const ethereumApi = new EthereumApi();
  const walletController = useWalletController();
  const { error, setError, address, setAddress, account, setAccount, balance, setBalance, cleanup } =
    walletController;

  const fillWalletWithData = async (accounts: [string]) => {
    if (Array.isArray(accounts) && accounts.length) {
      setAccount(accounts[0]);
      ethereumApi
        .getWalletDetails()
        .then(({ address, balance }: WalletDetailsType) => {
          setAddress(address);
          setBalance(balance);
        })
        .catch(setError);
    }
  };
  
  const checkExistingWalletConnection = () => {
    ethereumApi.request({ method: 'eth_accounts' }).then(fillWalletWithData).catch(setError);
  };

  const handleConnectWallet = () => {
    ethereumApi.request({ method: 'eth_requestAccounts' }).then(fillWalletWithData).catch(setError);
  };

  const handleAccountsChange = (accounts = []) => {
    const [entity] = accounts;
    if (!accounts.length) {
      cleanup();
    } else if (entity !== account) {
      setAccount(entity);

      console.log('ℹ️ wallet connected successfully!', entity);
    }
  };
    

  React.useEffect(() => {
    checkExistingWalletConnection.apply({});
    window.ethereum.on?.('accountsChanged', handleAccountsChange);
    return () => window.ethereum.removeListener?.('accountsChanged', handleAccountsChange);
  }, []);

  React.useEffect(() => {
    if (account && error) {
      setError('');
    }
  }, [account, error]);

  return (
    <WalletProvider walletController={walletController}>
      <div tw="flex items-center justify-center min-h-screen from-purple-100 via-red-300 to-indigo-500 bg-gradient-to-br">
        <div tw="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <div tw="flex flex-col items-center justify-center min-h-[14rem]">
            {account && (
              <>
                <img
                  tw="mb-3 w-24 h-24 rounded-full shadow-lg"
                  src={`https://avatars.dicebear.com/api/human/${account}.svg`}
                  alt="woof-woof"
                />
                <h3 tw="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  <Pulse ready={Boolean(balance)} size={Sizes.MEDIUM}>
                    {balance || '0.0'} {ethers.constants.EtherSymbol}
                  </Pulse>
                </h3>
                <div tw="w-full text-center text-sm text-gray-500 dark:text-gray-400">
                  <Pulse ready={Boolean(address)}>{address}</Pulse>
                </div>
              </>
            )}
            <div tw="flex space-x-3 lg:mt-6">
              {account ? (
                <Button onClick={cleanup} tw="mt-4">
                  Disconnect
                </Button>
              ) : (
                <MetaMaskButton onClick={handleConnectWallet}>Connect with MetaMask</MetaMaskButton>
              )}
            </div>
            {error && <div tw="flex mt-4 space-x-3 lg:mt-6 text-red-700 text-center">{error}</div>}
          </div>
        </div>
      </div>
    </WalletProvider>
  );
};

export default React.memo(App);
