import React from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../contexts/wallet';
import { EthereumApi } from '../../api/eth';
import { Button, MetaMaskButton, Pulse, Sizes } from '../../components';

enum Sprites {
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'croodles',
  'croodles-neutral',
  'identicon',
  'initials',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
};

const SPRITE_INDEX = Math.floor(Math.random() * (Object.keys(Sprites).length / 2));

const WalletConnect = ({ ethereum }: { ethereum: EthereumProvider }) => {
  const [processing, setProcessing] = React.useState(true);
  const ethereumApi = new EthereumApi(ethereum);
  const {
    error,
    setError,
    account,
    setAccount,
    balance,
    setBalance,
    cleanup,
  } = useWallet();

  const fillCtxWithData = (accounts: string[]) => {
    if (Array.isArray(accounts) && accounts.length) {
      setAccount(accounts[0]);
      ethereumApi.getFormattedBalance(accounts[0]).then(setBalance).catch(setError);
    }
  };

  const getActorAccounts = () => {
    ethereumApi
      .send('eth_accounts', [])
      .then(fillCtxWithData)
      .catch(setError)
      .finally(() => setProcessing(false));
  };

  const requestActorPermission = () => {
    ethereumApi.send('eth_requestAccounts', []).then(fillCtxWithData).catch(setError);
  };

  const handleAccountsChange = (accounts = []) => {
    if (!accounts.length) {
      cleanup();
    } else if (accounts[0] !== account) {
      fillCtxWithData(accounts);
    }
  };

  React.useEffect(() => {
    getActorAccounts.apply({});
    ethereum.on?.('accountsChanged', handleAccountsChange);
    return () => ethereum.removeListener?.('accountsChanged', handleAccountsChange);
  }, []);

  return (
    <>
      {account && (
        <>
          <img
            alt="Actor avatar"
            tw="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={`https://avatars.dicebear.com/api/${Sprites[SPRITE_INDEX]}/${account}.svg`}
          />
          <h3 tw="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            <Pulse ready={Boolean(balance)} size={Sizes.MEDIUM}>
              {balance || '0.0'} {ethers.constants.EtherSymbol}
            </Pulse>
          </h3>
          <div tw="w-full text-center text-sm text-gray-500 dark:text-gray-400">{account}</div>
        </>
      )}
      <div tw="flex space-x-3">
        {account && (
          <Button onClick={cleanup} tw="mt-4">
            Disconnect
          </Button>
        )}
        {!account && !processing && (
          <MetaMaskButton onClick={requestActorPermission}>Connect with MetaMask</MetaMaskButton>
        )}
      </div>
      {error && (
        <div tw="flex mt-4 space-x-3 lg:mt-6 text-red-700 text-center text-sm">{error}</div>
      )}
    </>
  );
};

export default React.memo(WalletConnect);
