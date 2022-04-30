import { TestBed } from '@angular/core/testing';

import { GetPaperByIdResolver } from './get-paper-by-id.resolver';

describe('GetPaperByIdResolver', () => {
  let resolver: GetPaperByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetPaperByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
