import { TestBed } from '@angular/core/testing';

import { GetModelByIdResolver } from './get-model-by-id.resolver';

describe('GetModelByIdResolver', () => {
  let resolver: GetModelByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetModelByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
