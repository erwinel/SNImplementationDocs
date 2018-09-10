import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LargeModalComponent, IInputFigure } from '../large-modal/large-modal.component';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';
import { IAppConfigSettings } from '../app-config-settings.service';

@Component({
  selector: 'app-howto-import-application',
  templateUrl: './howto-import-application.component.html',
  styleUrls: ['./howto-import-application.component.css']
})
export class HowtoImportApplicationComponent implements OnInit {
  @Input() titleText = 'How to import Update Sets';

  private _appSettings: Observable<IAppConfigSettings>;

  private _hasRepositoryUrl = false;
  public get hasRepositoryUrl(): boolean { return this._hasRepositoryUrl; }

  private _repositoryUrl = '';
  public get repositoryUrl(): string { return this._repositoryUrl; }
  @Input() public set repositoryUrl(v: string) {
    this._hasRepositoryUrl = (typeof(v) === 'string' && (v = v.trim()).length > 0);
    this._repositoryUrl = (this._hasRepositoryUrl) ? v : '';
  }

  private _nestedPopupOpen = false;
  public get nestedPopupOpen(): boolean { return this._nestedPopupOpen; }

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  openFigure(modalTitleText: string, modalImageUrl: string) {
    const modalRef = this.modalService.open(LargeModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: (typeof(this.activeModal) !== 'object' || this.activeModal === null) });
    this._nestedPopupOpen = true;
    modalRef.result.then((result) => {
      this._nestedPopupOpen = false;
    }, (reason) => {
      this._nestedPopupOpen = false;
    });
    modalRef.componentInstance.titleText = modalTitleText;
    modalRef.componentInstance.content = <IInputFigure>{ src: modalImageUrl, alt: modalTitleText };
  }
}
