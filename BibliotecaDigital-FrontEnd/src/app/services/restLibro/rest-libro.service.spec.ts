import { TestBed } from '@angular/core/testing';

import { RestLibroService } from './rest-libro.service';

describe('RestLibroService', () => {
  let service: RestLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
