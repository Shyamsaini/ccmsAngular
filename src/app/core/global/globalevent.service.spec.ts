import { TestBed } from '@angular/core/testing';

import { GlobaleventService } from './globalevent.service';

describe('GlobaleventService', () => {
  let service: GlobaleventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobaleventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
