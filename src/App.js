import { useEffect, useState } from "react";
import { ethers } from "ethers";
import clsx from "clsx";

import { Button, MetaMaskButton } from "./components";

import "./styles.css";

const WALLET_CONNECTION_ERROR_MESSAGE = "Please, connect MetaMask wallet!";

const App = () => {
  const [error, setError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  //   const retrieveDetails = async () => {
  //     var { ethereum } = window;
  //     var provider = new ethers.providers.Web3Provider(ethereum);
  //     var signer = provider.getSigner();
  //     var addr = await signer.getAddress();
  //     setWalletAddress(addr.toString());
  //   };

  const handleConnection = async () => {
    try {
      var { ethereum } = window;

      if (!ethereum) {
        setError(WALLET_CONNECTION_ERROR_MESSAGE);
      } else {
        // console.log("Ethereum object found", ethereum);
        // retrieveDetails();
      }

      var accounts = (await ethereum.request({ method: "eth_accounts" })) || [];

      if (accounts.length) {
        var [account] = accounts;
        var provider = new ethers.providers.Web3Provider(ethereum);
        var signer = provider.getSigner();
        var addr = await signer.getAddress();

        console.log("Found", account, "with", accounts, "addr");

        setCurrentAccount(account);
        setWalletAddress(addr.toString());
      } else {
        setError(
          `Could not find an authorized account! ${WALLET_CONNECTION_ERROR_MESSAGE}`
        );
      }
    } catch (error) {
      console.log("[handleConnection]", error);
      setError(WALLET_CONNECTION_ERROR_MESSAGE);
    }
  };

  const connectWallet = async () => {
    try {
      var { ethereum } = window;

      if (!ethereum) {
        setError(WALLET_CONNECTION_ERROR_MESSAGE);
      } else {
        var accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Account connected", accounts[0]);

        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log("[connectWallet]", error);
      setError(WALLET_CONNECTION_ERROR_MESSAGE);
    }
  };

  const handleAccountsChange = (accounts = []) => {
    var [account] = accounts;
    if (accounts.length === 0) {
      console.log("[handleAccountsChange]", WALLET_CONNECTION_ERROR_MESSAGE);
      setCurrentAccount("");
    } else if (account !== currentAccount) {
      setCurrentAccount(account);
      console.log("MetaMask connected successfully", account);
    }
  };

  // useEffect(() => {
  //   handleConnection();
  //   window.ethereum.on("accountsChanged", handleAccountsChange);
  // }, []);

  return (
    <div className="flex items-center justify-center min-h-screen from-purple-100 via-red-300 to-indigo-500 bg-gradient-to-br">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <img
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={
              currentAccount
                ? "https://avatars.githubusercontent.com/u/1412629?v=4"
                : "https://i.imgur.com/uj9yrxM.png"
            }
            alt="woof-woof"
          />
          <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {walletBalance} ETH
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Account: {walletAddress}
          </span>
          <div className="flex mt-4 space-x-3 lg:mt-6">
            {!currentAccount && (
              <MetaMaskButton onClick={connectWallet}>
                Connect with MetaMask
              </MetaMaskButton>
            )}
          </div>
          {!!error && (
            <div className="flex mt-4 space-x-3 lg:mt-6 text-error">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
