import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { InitialSnConfigComponent } from './initial-sn-config/initial-sn-config.component';
import { UpdateSetsComponent } from './update-sets/update-sets.component';
import { SnApplicationsComponent } from './sn-applications/sn-applications.component';
import { SnDevInfoComponent } from './sn-dev-info/sn-dev-info.component';
import { UpdateSetDetailComponent } from './update-set-detail/update-set-detail.component';
import { SnApplicationDetailComponent } from './sn-application-detail/sn-application-detail.component';

const routes: Routes = [
  { path: 'initial-config', component: InitialSnConfigComponent },
  { path: 'update-sets', component: UpdateSetsComponent },
  { path: 'update-set/:id', component: UpdateSetDetailComponent },
  { path: 'applications', component: SnApplicationsComponent },
  { path: 'application/:id', component: SnApplicationDetailComponent },
  { path: 'dev-info', component: SnDevInfoComponent },
  { path: '', component: AppHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
