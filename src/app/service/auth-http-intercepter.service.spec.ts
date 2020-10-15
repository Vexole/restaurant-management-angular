import { TestBed } from '@angular/core/testing';

import { AuthHttpIntercepterService } from './auth-http-intercepter.service';

describe('AuthHttpIntercepterService', () => {
  let service: AuthHttpIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHttpIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
