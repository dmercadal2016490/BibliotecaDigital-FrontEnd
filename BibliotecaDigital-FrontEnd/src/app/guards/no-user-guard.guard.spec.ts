import { TestBed } from '@angular/core/testing';

import { NoUserGuardGuard } from './no-user-guard.guard';

describe('NoUserGuardGuard', () => {
  let guard: NoUserGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoUserGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
