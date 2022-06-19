import { TestBed } from '@angular/core/testing';

import { EmployeeEditGuard } from './employee-edit.guard';

describe('EmployeeEditGuard', () => {
  let guard: EmployeeEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeeEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
