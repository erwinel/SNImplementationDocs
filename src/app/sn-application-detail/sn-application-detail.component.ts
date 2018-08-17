import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sn-application-detail',
  templateUrl: './sn-application-detail.component.html',
  styleUrls: ['./sn-application-detail.component.css']
})
export class SnApplicationDetailComponent implements OnInit {

  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.titleText = 'Custom Application Detail';
    this._app.descriptionText = '';
  }

}
