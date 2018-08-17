import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static readonly DefaultTitleText = 'ServiceNow Implementation, Dev and Maintenance';
  titleText = AppComponent.DefaultTitleText;
  descriptionText = '';
}
