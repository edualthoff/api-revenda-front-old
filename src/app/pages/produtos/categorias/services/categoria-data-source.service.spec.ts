import { TestBed } from '@angular/core/testing';

import { CategoriaDataSource } from './categoria.datasource';

describe('CategoriaDataSource', () => {
  let service: CategoriaDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaDataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
