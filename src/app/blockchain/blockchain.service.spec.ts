import { BlockchainNetworkDTO, BlockchainService } from './blockchain.service';
import { MockRender } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';

describe('BlockchainService', () => {

  const networks: BlockchainNetworkDTO[] = [{
    name: 'ropsten',
    networkId: 3,
    displayName: 'Ropsten',
    tokenAddress: '0x45B89a627AF99DcCdF25a03F6f4986F55e9EB491',
    escrowAddress: '0x0C1FAB9103564258F7173f5849BcB433Cf5513B2',
    appAddress: '0x992419b34A8ec785E07842804878d6d799f8Eaac',
    explorerUrl: 'https://ropsten.etherscan.io/'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const fixture = MockRender(BlockchainService);
    expect(fixture).toBeDefined();
  });

  it('should get ethereum network', () => {
    const fixture = MockRender(BlockchainService);
    const service = fixture.point.componentInstance;
    service.initNetworks();

    const httpMock = TestBed.inject(HttpTestingController);
    const request = httpMock.expectOne(`${environment.apiEndpoint}/blockchain`);
    request.flush(networks);
    httpMock.verify();

    expect(service.getNetworkConfig(3)).toEqual(networks[0]);
    expect(service.getNetworkConfig(33)).toBeUndefined();

    expect(service.getNetworkByName('ropsten')).toEqual(networks[0]);
    expect(service.getNetworkByName('invalid')).toBeUndefined();
  });
});
