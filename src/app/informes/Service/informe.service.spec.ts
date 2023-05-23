import { TestBed } from '@angular/core/testing';

import { informeService } from './informe.service';

describe('informeService', () => {
  let service: informeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(informeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
