import { TestBed } from '@angular/core/testing';

import { AuthenticTokenInterceptor } from './authentic-token.interceptor';

describe('AuthenticTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticTokenInterceptor = TestBed.inject(AuthenticTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
