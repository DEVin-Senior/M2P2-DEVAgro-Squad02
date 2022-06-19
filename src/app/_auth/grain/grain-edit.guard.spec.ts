import { TestBed } from '@angular/core/testing';

import { GrainEditGuard } from './grain-edit.guard';

describe('GrainEditGuard', () => {
  let guard: GrainEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GrainEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
