import { Component } from '@angular/core';
import { AppConfigSettingsService, IAppConfigSettings } from './app-config-settings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static readonly DefaultTitleText = 'ServiceNow Implementation, Dev and Maintenance';
  titleText = AppComponent.DefaultTitleText;
  descriptionText = '';

  private _appConfigSettings: Observable<IAppConfigSettings>|undefined;
  public get appConfigSettings(): Observable<IAppConfigSettings> { return this._appConfigSettings; }

  constructor(appConfigSettingsSvc: AppConfigSettingsService) {
    this._appConfigSettings = appConfigSettingsSvc.getSettings();
  }
}
