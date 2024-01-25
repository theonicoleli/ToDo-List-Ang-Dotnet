import { TestBed } from '@angular/core/testing';

import { CurrentPersonService } from './current-person.service';

describe('CurrentPersonService', () => {
  let service: CurrentPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
