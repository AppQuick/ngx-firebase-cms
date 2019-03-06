import { NgModule, Inject } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { UnauthGuard } from './guard/unauth.guard';
import { EmailsComponent } from './component/emails/emails.component';
import { EmailComponent } from './component/email/email.component';
import { UsersComponent } from './component/users/users.component';
import { UserComponent } from './component/user/user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormComponent } from './component/form/form.component';
import { FormsComponent } from './component/forms/forms.component';
import { PostsComponent } from './component/posts/posts.component';
import { PostComponent } from './component/post/post.component';
import { FilesComponent } from './component/files/files.component';
import { FileComponent } from './component/file/file.component';
import { SignupComponent } from './component/signup/signup.component';
import { EnvConfig } from './interface/env-config';

let routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
      { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard], data: {} },
      { path: 'emails', component: EmailsComponent, canActivate: [AuthGuard], data: {} },
      { path: 'emails/:id', component: EmailComponent, canActivate: [AuthGuard], data: {} },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {} },
      { path: 'forms', component: FormsComponent, canActivate: [AuthGuard], data: {} },
      { path: 'forms/:id', component: FormComponent, canActivate: [AuthGuard], data: {} },
      { path: 'posts', component: PostsComponent, canActivate: [AuthGuard], data: {} },
      { path: 'posts/:id', component: PostComponent, canActivate: [AuthGuard], data: {} },
      { path: 'files', component: FilesComponent, canActivate: [AuthGuard], data: {} },
      { path: 'files/:id', component: FileComponent, canActivate: [AuthGuard], data: {} },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {} },
      { path: 'users/:id', component: UserComponent, canActivate: [AuthGuard], data: {} }
    ]
  }
];

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