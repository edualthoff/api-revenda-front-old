import { TestBed } from '@angular/core/testing';

import { HttpCadastroService } from './http-cadastro.service';

describe('HttpCadastroService', () => {
  let service: HttpCadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
