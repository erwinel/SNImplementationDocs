import { TestBed, inject } from '@angular/core/testing';

import { AppConfigSettingsService } from './app-config-settings.service';

describe('AppConfigSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigSettingsService]
    });
  });

  it('should be created', inject([AppConfigSettingsService], (service: AppConfigSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
