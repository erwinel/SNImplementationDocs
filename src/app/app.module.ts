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


@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    SnApplicationsComponent,
    InitialSnConfigComponent,
    UpdateSetsComponent,
    SnDevInfoComponent,
    UpdateSetDetailComponent,
    SnApplicationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
