import { TestBed } from '@angular/core/testing';

import { AuthTokenstorageService } from './auth-tokenstorage.service';

describe('AuthTokenstorageService', () => {
  let service: AuthTokenstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
