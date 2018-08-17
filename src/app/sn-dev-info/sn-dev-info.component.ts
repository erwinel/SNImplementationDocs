import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sn-dev-info',
  templateUrl: './sn-dev-info.component.html',
  styleUrls: ['./sn-dev-info.component.css']
})
export class SnDevInfoComponent implements OnInit {
  static readonly TitleText = 'ServiceNow Dev Info';

  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.titleText = SnDevInfoComponent.TitleText;
    this._app.descriptionText = '';
  }

}
