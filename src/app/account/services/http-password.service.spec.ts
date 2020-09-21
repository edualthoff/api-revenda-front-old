import { TestBed } from '@angular/core/testing';

import { HttpPasswordService } from './http-password.service';

describe('HttpPasswordService', () => {
  let service: HttpPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
