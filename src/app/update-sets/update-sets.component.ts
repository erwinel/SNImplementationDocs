import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-update-sets',
  templateUrl: './update-sets.component.html',
  styleUrls: ['./update-sets.component.css']
})
export class UpdateSetsComponent implements OnInit {
  static readonly TitleText = 'Update Sets';

  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.titleText = UpdateSetsComponent.TitleText;
    this._app.descriptionText = '';
  }

}
