import { TestBed } from '@angular/core/testing';

import { HrsService } from './hrs.service';

describe('HrsService', () => {
  let service: HrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
