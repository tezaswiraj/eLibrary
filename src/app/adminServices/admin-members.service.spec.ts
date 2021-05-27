import { TestBed } from '@angular/core/testing';

import { AdminMembersService } from './admin-members.service';

describe('AdminMembersService', () => {
  let service: AdminMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
