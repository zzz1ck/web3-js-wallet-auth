import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';
import { ethers } from 'ethers';
import { WALLET_ERRORS } from './constants';

export type RequestType = { method: string };
export type CaughtErrorType = { message: string } | any;
export type WalletDetailsType = { address: string; balance: string };

export class EthereumApi {
  private readonly api: ExternalProvider;
  private readonly provider: ethers.providers.Web3Provider;

  constructor() {
    const { ethereum } = window;
    this.api = ethereum;
    this.provider = new ethers.providers.Web3Provider(ethereum);
  }

  public async request(options: RequestType): Promise<[string]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.api) {
          throw new Error(WALLET_ERRORS.pleaseMakeSure);
        }
        const response = await this.api.request?.(options);
        resolve(response);
      } catch (error: CaughtErrorType) {
        reject(error?.message || WALLET_ERRORS.default);
      }
    });
  }

  public async getWalletDetails(): Promise<WalletDetailsType> {
    return new Promise(async (resolve, reject) => {
      try {
        const signer = this.provider.getSigner();
        const addr = await signer.getAddress();
        const balance = await this.provider.getBalance(addr);
        resolve({ address: addr.toString(), balance: ethers.utils.formatEther(balance) });
      } catch (error: CaughtErrorType) {
        reject(error?.message || WALLET_ERRORS.default);
      }
    });
  }
}
