import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export declare class BlockchainNetworkDTO {
  name: string;
  displayName: string;
  networkId: number;
  appAddress: string;
  escrowAddress: string;
  tokenAddress: string;
  explorerUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  networks: BlockchainNetworkDTO[] = [];

  constructor(private http: HttpClient) {
  }

  initNetworks(): void {
    this.getAllNetworkConfigs().subscribe(networks => this.networks = networks);
  }

  getAllNetworkConfigs(): Observable<BlockchainNetworkDTO[]> {
    return this.http.get<BlockchainNetworkDTO[]>(`${environment.apiEndpoint}/blockchain`);
  }

  getNetworkByName(networkName: string): BlockchainNetworkDTO | undefined {
    for (const network of this.networks) {
      if (network.name === networkName) {
        return network;
      }
    }
    return undefined;
  }

  getNetworkConfig(networkId: number): BlockchainNetworkDTO | undefined {
    for (const network of this.networks) {
      if (network.networkId === networkId) {
        return network;
      }
    }
    return undefined;
  }
}
