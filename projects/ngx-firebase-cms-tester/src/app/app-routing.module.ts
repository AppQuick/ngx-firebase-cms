import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxFirebaseCmsModule } from 'ngx-firebase-cms';
import { HomepageComponent } from './component/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'admin', loadChildren: () => NgxFirebaseCmsModule },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
