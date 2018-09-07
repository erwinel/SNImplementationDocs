import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LargeModalComponent, IInputFigure } from '../large-modal/large-modal.component';

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
  closeResult: string;
  private _modalTitleText = '';
  private _modalImageUrl = '';
  public get modalTitleText(): string { return this._modalTitleText; }
  public get modalImageUrl(): string { return this._modalImageUrl; }

  constructor(private _app: AppComponent, private _modalService: NgbModal) { }

  openFigure(modalTitleText: string, modalImageUrl: string) {
    const modalRef = this._modalService.open(LargeModalComponent, { size: 'lg' });
    modalRef.componentInstance.titleText = modalTitleText;
    modalRef.componentInstance.content = <IInputFigure>{ src: modalImageUrl, alt: modalTitleText };
  }

  ngOnInit() {
    this._app.titleText = InitialSnConfigComponent.TitleText;
    this._app.descriptionText = '';
  }

}
