import { TestBed } from '@angular/core/testing';

import { ScoringsService } from './scorings.service';

describe('ScoringsService', () => {
  let service: ScoringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
