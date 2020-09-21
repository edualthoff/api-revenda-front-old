import { TestBed } from '@angular/core/testing';

import { HttpCategoriasService } from './http-categorias.service';

describe('HttpCategoriasService', () => {
  let service: HttpCategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
