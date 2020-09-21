import { TestBed } from '@angular/core/testing';

import { HttpVerificarService } from './http-verificar.service';

describe('HttpVerificarService', () => {
  let service: HttpVerificarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpVerificarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
