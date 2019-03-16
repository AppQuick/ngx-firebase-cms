import { NgModule, Inject } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { EnvConfig } from './interface/env-config';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { PostsComponent } from './component/posts/posts.component';
import { SignupComponent } from './component/signup/signup.component';
import { PostComponent } from './component/post/post.component';
import { FormsComponent } from './component/forms/forms.component';
import { FormComponent } from './component/form/form.component';
import { FilesComponent } from './component/files/files.component';
import { FileComponent } from './component/file/file.component';
import { EmailsComponent } from './component/emails/emails.component';
import { EmailComponent } from './component/email/email.component';
import { UsersComponent } from './component/users/users.component';
import { UserComponent } from './component/user/user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UnauthGuard } from './guard/unauth.guard';
import { AuthGuard } from './guard/auth.guard';

let routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'posts', component: PostsComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'files', component: FilesComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'file/:id', component: FileComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'emails', component: EmailsComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'email/:id', component: EmailComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'forms', component: FormsComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'form/:id', component: FormComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['Administrator', 'Editor', 'Author'] } },
      { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
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