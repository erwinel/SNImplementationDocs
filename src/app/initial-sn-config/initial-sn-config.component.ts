import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-initial-sn-config',
  templateUrl: './initial-sn-config.component.html',
  styleUrls: ['./initial-sn-config.component.css']
})
export class InitialSnConfigComponent implements OnInit {
  static readonly TitleText = 'Initial Configuration';
  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.titleText = InitialSnConfigComponent.TitleText;
    this._app.descriptionText = '';
  }

}
