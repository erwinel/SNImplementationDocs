import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LargeModalComponent, InputContent, IInputFigure } from '../large-modal/large-modal.component';
import { HowtoImportUpdateSetComponent } from '../howto-import-update-set/howto-import-update-set.component';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { HowtoImportApplicationComponent } from '../howto-import-application/howto-import-application.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// export class ModalVisiblity {
//   private _isVisible = false;
//   public get isVisible(): boolean { return this._isVisible; }
//   public get isHidden(): boolean { return !this._isVisible; }
//   public toggle(): void { this._isVisible = !this._isVisible; }
//   public show(): void {
//     console.log('Making visible');
//     this._isVisible = true;
//   }
//   public hide(): void {
//     console.log('Making invisible');
//     this._isVisible = false;
//   }
// }

interface IRepositoryUrlSettings {
  util: string;
  grpnamereg: string;
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
  private _howtoImportUpdateSetFolder = 'downloads';
  private _howtoImportUpdateSetFileName = 'sys_remote_update_set_Initial_Setup.xml';
  private _repositoryUrlSettings: Observable<IRepositoryUrlSettings>;
  private _utilRepositoryUrl = '';
  private _grpnameregRepositoryUrl = '';
  private _urlSettings: IRepositoryUrlSettings = {
    util: '',
    grpnamereg: ''
  };
  public get modalTitleText(): string { return this._modalTitleText; }
  public get modalImageUrl(): string { return this._modalImageUrl; }
  public get howtoImportUpdateSetFolder(): string { return this._howtoImportUpdateSetFolder; }
  public get howtoImportUpdateSetFileName(): string { return this._howtoImportUpdateSetFileName; }
  public get utilRepositoryUrl(): string { return this._utilRepositoryUrl; }
  public get grpnameregRepositoryUrl(): string { return this._grpnameregRepositoryUrl; }
  constructor(private _app: AppComponent, private _modalService: NgbModal) {
    this._repositoryUrlSettings = this._app.appConfigSettings.pipe(map(r => {
      return <IRepositoryUrlSettings>{
        util: r.rootGitUrl + '/x_44813_util.git',
        grpnamereg: r.rootGitUrl + '/x_44813_grpnamereg.git'
      };
    }));
    this._repositoryUrlSettings.subscribe(settings => {
      this._utilRepositoryUrl = settings.util;
      this._grpnameregRepositoryUrl = settings.grpnamereg;
    });
  }

  openHowtoImportUpdateSet() {
    const modalRef = this._modalService.open(HowtoImportUpdateSetComponent, { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.downloadLinkUrl = this._howtoImportUpdateSetFolder + '/' + this._howtoImportUpdateSetFileName;
    modalRef.componentInstance.updateSetFileName = this._howtoImportUpdateSetFileName;
  }

  openHowtoImportApplication(name: string) {
    const modalRef = this._modalService.open(HowtoImportApplicationComponent, { size: 'lg', centered: true, backdrop: 'static' });
    this._repositoryUrlSettings.subscribe(settings => {
        modalRef.componentInstance.repositoryUrl = settings[name];
    });
  }

  openFigure(modalTitleText: string, modalImageUrl: string) {
    const modalRef = this._modalService.open(LargeModalComponent, { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.titleText = modalTitleText;
    modalRef.componentInstance.content = <IInputFigure>{ src: modalImageUrl, alt: modalTitleText };
  }

  ngOnInit() {
    this._app.titleText = InitialSnConfigComponent.TitleText;
    this._app.descriptionText = '';
  }

}
