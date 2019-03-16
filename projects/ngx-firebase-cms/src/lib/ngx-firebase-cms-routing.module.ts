import { NgModule, Inject } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { EnvConfig } from './interface/env-config';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';

let routes: Routes = [
    {
      path: '', component: DashboardComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'dashboard', component: HomeComponent }
      ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NgxFirebaseCmsRoutingModule {
    constructor(
      @Inject('env') private config: EnvConfig,
    ) {
      routes[0].children.map(route => {
        if (route['data']) {
          route['data']["roles"] = this.config.roles || ['Administrator', 'Editor', 'Author', 'Contributor']
          return route
        } else {
          return route
        }
      })
    }
    
  }