import { TestBed } from '@angular/core/testing';

import { AbastractApiService } from './abastract-api.service';

describe('AbastractApiService', () => {
  let service: AbastractApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbastractApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
