import { MockBuilder } from 'ng-mocks';
import { TestBed } from '@angular/core/testing';
import { EthereumService } from './ethereum.service';
import { PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { lastValueFrom, of } from 'rxjs';
import { ethers } from 'ethers';
import { BlockchainService } from './blockchain.service';

describe('EthereumService', () => {
  beforeEach(() => MockBuilder(EthereumService)
    .mock(PLATFORM_ID, 'browser')
    .provide({
      provide: DOCUMENT, useValue: {
        defaultView: {
          window: {
            ethereum: {
              isMetaMask: true,
              _metamask: { isUnlocked: () => true },
              _state: {
                sentWarnings: {
                  enable: false,
                  experimentalMethods: false,
                  send: false,
                  events: {
                    close: false,
                    data: false,
                    networkChanged: false,
                    notification: false
                  }
                },
                accounts: [
                  '0x334b03343e854a2241443763c0d1852a91169bf4'
                ],
                isConnected: true,
                isUnlocked: false,
                initialized: true,
                isPermanentlyDisconnected: false
              },
              selectedAddress: '0x334b03343e854a2241443763c0d1852a91169bf4',
              networkVersion: '3',
              chainId: '0x3',
              _rpcEngine: {
                _events: {},
                _eventsCount: 0,
                _middleware: [
                  null,
                  null,
                  null
                ]
              },
              request: () => lastValueFrom(of({})),
            }
          }
        }
      }
    }));


  it('should be created', () => {
    const service = TestBed.inject(EthereumService);
    expect(service).toBeDefined();
  });

  it('should init', async () => {
    const service = TestBed.inject(EthereumService);
    const blockchainService = TestBed.inject(BlockchainService);
    // @ts-ignore
    spyOn(ethers.providers.Web3Provider.prototype, 'getNetwork').and.returnValue(lastValueFrom(of({
      chainId: 1
    })));
    spyOn(ethers.providers.JsonRpcSigner.prototype, 'getAddress');
    spyOn(blockchainService, 'getNetworkConfig').and.returnValue({
      name: 'ropsten',
      networkId: 3,
      displayName: 'Ropsten',
      tokenAddress: '0x45B89a627AF99DcCdF25a03F6f4986F55e9EB491',
      escrowAddress: '0x0C1FAB9103564258F7173f5849BcB433Cf5513B2',
      appAddress: '0x992419b34A8ec785E07842804878d6d799f8Eaac',
      explorerUrl: 'https://ropsten.etherscan.io/'
    });

    const result = await service.init();
    expect(result).toBeTrue();
    expect(service.isReady()).toBeTrue();
  });

  it('should hash file', () => {
    const service = TestBed.inject(EthereumService);
    const encoder = new TextEncoder();
    const hashedText = service.hashFile(encoder.encode('This is my text to hash'));
    expect(hashedText).toEqual('bdae32bc107f8274b4981093e0b8104173d24bef0331051559981f3a1c0d3410');

    const hashedTextWith0x = service.hashFile(encoder.encode('This is my text to hash'), true);
    expect(hashedTextWith0x).toEqual('0xbdae32bc107f8274b4981093e0b8104173d24bef0331051559981f3a1c0d3410');
  });
});


describe('EthereumService Without Ethereum', () => {
  beforeEach(() => MockBuilder(EthereumService)
    .mock(PLATFORM_ID, 'browser')
    .provide({
      provide: DOCUMENT, useValue: {
        defaultView: {
          window: {}
        }
      }
    }));


  it('should be created', () => {
    const service = TestBed.inject(EthereumService);
    expect(service).toBeDefined();
  });

  it('should not init if ethereum is not available', async () => {
    const service = TestBed.inject(EthereumService);
    const result = await service.init();
    expect(result).toBeFalse();
  });
});


describe('EthereumService SSR', () => {
  beforeEach(() => MockBuilder(EthereumService)
    .mock(PLATFORM_ID, 'server'));

  it('should be created', () => {
    const service = TestBed.inject(EthereumService);
    expect(service).toBeDefined();
  });

  it('should not init in SSR', async () => {
    const service = TestBed.inject(EthereumService);
    const result = await service.init();
    expect(result).toBeFalse();
    expect(service.isReady()).toBeFalse();
  });
});
