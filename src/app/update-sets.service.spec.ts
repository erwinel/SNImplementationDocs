import { TestBed, inject } from '@angular/core/testing';

import { UpdateSetsService } from './update-sets.service';

describe('UpdateSetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateSetsService]
    });
  });

  it('should be created', inject([UpdateSetsService], (service: UpdateSetsService) => {
    expect(service).toBeTruthy();
  }));
});
