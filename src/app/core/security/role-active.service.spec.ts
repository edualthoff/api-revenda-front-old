import { TestBed } from '@angular/core/testing';

import { RoleActiveService } from './role-active.service';

describe('RoleActiveService', () => {
  let service: RoleActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
