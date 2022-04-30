import { TestBed } from '@angular/core/testing';

import { GetReviewByIdResolver } from './get-review-by-id.resolver';

describe('GetReviewByIdResolver', () => {
  let resolver: GetReviewByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetReviewByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
