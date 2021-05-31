import { TestBed } from '@angular/core/testing';

import { UserOwnedService } from './user-owned.service';

describe('UserOwnedService', () => {
  let service: UserOwnedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOwnedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
