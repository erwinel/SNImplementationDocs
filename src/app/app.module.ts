import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { SnApplicationsComponent } from './sn-applications/sn-applications.component';
import { InitialSnConfigComponent } from './initial-sn-config/initial-sn-config.component';
import { UpdateSetsComponent } from './update-sets/update-sets.component';
import { SnDevInfoComponent } from './sn-dev-info/sn-dev-info.component';
import { UpdateSetDetailComponent } from './update-set-detail/update-set-detail.component';
import { SnApplicationDetailComponent } from './sn-application-detail/sn-application-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LargeModalComponent } from './large-modal/large-modal.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { HowtoImportUpdateSetComponent } from './howto-import-update-set/howto-import-update-set.component';
import { HowtoImportApplicationComponent } from './howto-import-application/howto-import-application.component';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    SnApplicationsComponent,
    InitialSnConfigComponent,
    UpdateSetsComponent,
    SnDevInfoComponent,
    UpdateSetDetailComponent,
    SnApplicationDetailComponent,
    LargeModalComponent,
    PopupModalComponent,
    HowtoImportUpdateSetComponent,
    HowtoImportApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LargeModalComponent, PopupModalComponent, HowtoImportUpdateSetComponent, HowtoImportApplicationComponent]
})
export class AppModule { }
