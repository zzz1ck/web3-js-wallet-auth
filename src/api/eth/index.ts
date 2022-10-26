import { ethers } from 'ethers';
import { WALLET_ERRORS } from './constants';

export class EthereumApi {
  private readonly provider: ethers.providers.Web3Provider;

  constructor(ethereum: EthereumProvider) {
    this.provider = new ethers.providers.Web3Provider(ethereum);
  }

  public async send(method: string, options: []): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.provider.send(method, options);
        resolve(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        reject(error?.message || WALLET_ERRORS.default);
      }
    });
  }

  public async getFormattedBalance(account: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const balance = await this.provider.getBalance(account);
        resolve(ethers.utils.formatEther(balance));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        reject(error?.message || WALLET_ERRORS.default);
      }
    });
  }
}
