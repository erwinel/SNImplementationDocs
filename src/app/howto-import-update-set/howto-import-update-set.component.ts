import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LargeModalComponent, IInputFigure } from '../large-modal/large-modal.component';

@Component({
  selector: 'app-howto-import-update-set',
  templateUrl: './howto-import-update-set.component.html',
  styleUrls: ['./howto-import-update-set.component.css']
})
export class HowtoImportUpdateSetComponent implements OnInit {
  @Input() titleText = 'How to import Update Sets';
  @Input() downloadLinkUrl = '';
  @Input() updateSetFileName = 'Update set XML';

  private _nestedPopupOpen = false;
  public get nestedPopupOpen(): boolean { return this._nestedPopupOpen; }

  public get showDownloadLink(): boolean { return typeof(this.downloadLinkUrl) === 'string' && this.downloadLinkUrl.trim().length > 0; }

  public get updateSetFileNameDisplayText(): string {
    if (typeof(this.updateSetFileName) === 'string' && this.updateSetFileName.trim().length > 0)
      return this.updateSetFileName;
    return (typeof(this.downloadLinkUrl) === 'string') ? this.downloadLinkUrl : 'the update set XML file';
  }
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
