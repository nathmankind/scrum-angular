import { TestBed } from '@angular/core/testing';

import { ScrumserviceService } from './scrumservice.service';

describe('ScrumserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrumserviceService = TestBed.get(ScrumserviceService);
    expect(service).toBeTruthy();
  });
});
