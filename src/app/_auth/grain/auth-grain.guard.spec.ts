import { TestBed } from '@angular/core/testing';

import { AuthGrainGuard } from './auth-grain.guard';

describe('AuthGrainGuard', () => {
  let guard: AuthGrainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGrainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
