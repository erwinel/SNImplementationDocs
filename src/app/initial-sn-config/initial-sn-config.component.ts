import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class ModalVisiblity {
  private _isVisible = false;
  public get isVisible(): boolean { return this._isVisible; }
  public get isHidden(): boolean { return !this._isVisible; }
  public toggle(): void { this._isVisible = !this._isVisible; }
  public show(): void {
    console.log('Making visible');
    this._isVisible = true;
  }
  public hide(): void {
    console.log('Making invisible');
    this._isVisible = false;
  }
}
@Component({
  selector: 'app-initial-sn-config',
  templateUrl: './initial-sn-config.component.html',
  styleUrls: ['./initial-sn-config.component.css']
})
export class InitialSnConfigComponent implements OnInit {
  static readonly TitleText = 'Initial Configuration';
  private _relatedLinksModal = new ModalVisiblity();
  public get relatedLinksModal(): ModalVisiblity { return this._relatedLinksModal; }

  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.titleText = InitialSnConfigComponent.TitleText;
    this._app.descriptionText = '';
  }

}
