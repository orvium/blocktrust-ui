import { TestBed } from '@angular/core/testing';

import { ReputationModelService } from './reputation-model.service';

describe('ReputationModelService', () => {
  let service: ReputationModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReputationModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
