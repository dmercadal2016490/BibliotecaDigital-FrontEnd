import { TestBed } from '@angular/core/testing';

import { RestReservacionService } from './rest-reservacion.service';

describe('RestReservacionService', () => {
  let service: RestReservacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestReservacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
