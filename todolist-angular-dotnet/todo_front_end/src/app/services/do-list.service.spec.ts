import { TestBed } from '@angular/core/testing';

import { DoListService } from './do-list.service';

describe('DoListService', () => {
  let service: DoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
