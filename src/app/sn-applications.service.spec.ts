import { TestBed, inject } from '@angular/core/testing';

import { SnApplicationsService } from './sn-applications.service';

describe('SnApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnApplicationsService]
    });
  });

  it('should be created', inject([SnApplicationsService], (service: SnApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});
