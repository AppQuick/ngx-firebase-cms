import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxFirebaseCMSModule } from 'ngx-firebase-cms';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'admin', loadChildren: () => NgxFirebaseCMSModule },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
