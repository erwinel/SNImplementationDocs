import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sn-applications',
  templateUrl: './sn-applications.component.html',
  styleUrls: ['./sn-applications.component.css']
})
export class SnApplicationsComponent implements OnInit {
  static readonly TitleText = 'Custom Applications';

  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.titleText = SnApplicationsComponent.TitleText;
    this._app.descriptionText = '';
  }

}
