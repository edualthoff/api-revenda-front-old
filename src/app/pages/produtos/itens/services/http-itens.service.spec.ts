import { TestBed } from '@angular/core/testing';

import { HttpItensService } from './http-itens.service';

describe('HttpItensService', () => {
  let service: HttpItensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpItensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
