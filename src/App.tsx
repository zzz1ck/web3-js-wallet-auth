import WalletConnect from './views/WalletConnect';
import { WALLET_ERRORS } from './api/eth/constants';
import { WalletProvider, useWalletController } from './contexts/wallet';

const App = () => {
  const walletController = useWalletController();
  return (
    <WalletProvider walletController={walletController}>
      <div tw="flex items-center justify-center min-h-screen from-purple-100 via-red-300 to-indigo-500 bg-gradient-to-br">
        <div tw="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <div tw="flex flex-col items-center justify-center min-h-[14rem]">
            {window.ethereum ? (
              <WalletConnect ethereum={window.ethereum} />
            ) : (
              <div tw="flex space-x-3 lg:mt-6 text-red-700 text-center">
                {WALLET_ERRORS.pleaseMakeSure}
              </div>
            )}
          </div>
        </div>
      </div>
    </WalletProvider>
  );
};

export default App;
