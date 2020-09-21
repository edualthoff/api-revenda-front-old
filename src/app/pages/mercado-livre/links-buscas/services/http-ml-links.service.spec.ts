import { TestBed } from '@angular/core/testing';

import { HttpMlLinksService } from './http-ml-links.service';

describe('HttpMlLinksService', () => {
  let service: HttpMlLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMlLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
