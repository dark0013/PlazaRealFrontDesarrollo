import { TestBed } from '@angular/core/testing';

import { SportsmanService } from './sportsman.service';

describe('SportsmanService', () => {
  let service: SportsmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
