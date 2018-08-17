import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-update-set-detail',
  templateUrl: './update-set-detail.component.html',
  styleUrls: ['./update-set-detail.component.css']
})
export class UpdateSetDetailComponent implements OnInit {

  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.titleText = 'Update Set Detail';
    this._app.descriptionText = '';
  }

}
