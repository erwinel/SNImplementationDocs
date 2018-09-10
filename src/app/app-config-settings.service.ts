import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map  } from 'rxjs/operators';

export interface IAppConfigSettings {
  rootGitUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigSettingsService {
  constructor(private http: HttpClient) { }
  getSettings(): Observable<IAppConfigSettings> {
    return this.http.get<IAppConfigSettings>('./assets/appConfigSettings.json', { observe: 'body' });
  }
}
