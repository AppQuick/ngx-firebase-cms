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

let routes: Routes = [
    {
      path: '', component: DashboardComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'posts', component: PostsComponent },
        { path: 'post/:id', component: PostComponent },
        { path: 'files', component: FilesComponent },
        { path: 'file/:id', component: FileComponent },
        { path: 'emails', component: EmailsComponent },
        { path: 'email/:id', component: EmailComponent },
        { path: 'users', component: UsersComponent },
        { path: 'user/:id', component: UserComponent },
        { path: 'forms', component: FormsComponent },
        { path: 'form/:id', component: FormComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
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