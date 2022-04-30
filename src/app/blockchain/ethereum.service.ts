import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, from, lastValueFrom } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BlockchainNetworkDTO, BlockchainService } from './blockchain.service';
import { Web3Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { keccak256 } from 'ethers/lib.esm/utils';
import { timeout } from 'rxjs/operators';
import { SnackBarService } from '../core/services/snack-bar/snack-bar.service';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}
const tokenDecimals = '000000000000000000';

@Injectable({ providedIn: 'root' })
export class EthereumService {
  public networkConfig?: BlockchainNetworkDTO;
  public isInitialized = false;
  currentNetwork = new BehaviorSubject<BlockchainNetworkDTO | undefined>(undefined);
  public account?: string;
  public isAvailable = new BehaviorSubject<boolean>(false);
  private provider?: Web3Provider;
  private signer?: Signer;
  private isPlatformBrowser = false;

  constructor(private snackService: SnackBarService,
              private blockchainService: BlockchainService,
              @Inject(DOCUMENT) public document: Document,
              @Inject(PLATFORM_ID) private platformId: string) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    if (this.isPlatformBrowser && this.document.defaultView) {
      const window = this.document.defaultView.window;
      if (window.ethereum?.isMetaMask) {
        this.isAvailable.next(true);
      }
    }
  }

  async init(): Promise<boolean> {
    this.isInitialized = false;
    const window = this.document.defaultView?.window;

    if (!this.isPlatformBrowser || !window) {
      console.log('This is only available in browser');
      return false;
    }

    if (!window.ethereum) {
      console.log('Ethereum not detected in this browser');
      return false;
    }

    // Enable metamask extension
    const promise = lastValueFrom(from(window.ethereum.request({ method: 'eth_requestAccounts' })).pipe(
      timeout(20000)
    ));

    try {
      await promise;
    } catch (error) {
      console.warn(error);
      this.snackService.openSnackBar('Please check your Metamask extension', 'Hide');
      return false;
    }

    // lazy load ethers js library
    const ethers = await import('ethers');

    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page
    this.provider = new ethers.providers.Web3Provider(window.ethereum);

    // The Metamask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    this.signer = this.provider.getSigner();
    this.account = await this.signer.getAddress();
    this.provider.on('networkChanged', (networkId: unknown) => {
      document.location.reload();
    });

    try {
      const network = await this.provider.getNetwork();
      // this.networkConfig = this.blockchainService.getNetworkConfig(network.chainId);
      // if (!this.networkConfig) {
      //   this.snackService.openSnackBar('Ethereum: This network is not supported, please select another one', 'Hide');
      //   return false;
      // }
      // this.currentNetwork.next(this.networkConfig);
    } catch (error) {
      console.warn(error);
      this.snackService.openSnackBar('Ethereum: This network is not supported, please select another one', 'Hide');
      return false;
    }

    this.isInitialized = true;
    localStorage.setItem('metamask', 'true');

    return true;
  }

  public close(): void {
    localStorage.setItem('metamask', 'false');
    this.isInitialized = false;
  }

  public isReady(): boolean {
    return this.isInitialized && this.document.defaultView?.window.ethereum._metamask.isUnlocked();
  }

  hashFile(body: ArrayBuffer, hexPrefix = false): string {
    let hash = keccak256(new Uint8Array(body));
    if (!hexPrefix) {
      hash = hash.substring(2);
    }
    return hash;
  }
}
