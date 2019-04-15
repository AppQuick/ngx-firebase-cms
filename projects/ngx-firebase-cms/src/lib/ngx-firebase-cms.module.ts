import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';
import { InboxOutline, UserOutline, LockOutline, IdcardOutline, TeamOutline, FormOutline, SettingOutline, DesktopOutline, UnlockOutline, HddOutline, PictureOutline, MailFill, MailOutline, ContactsOutline, CloudOutline, CloudUploadOutline } from '@ant-design/icons-angular/icons';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { DynamicBuilderComponent } from './component/dynamic-builder/dynamic-builder.component';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import { EmailComponent } from './component/email/email.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { FilesComponent } from './component/files/files.component';
import { FileComponent } from './component/file/file.component';
import { UsersComponent } from './component/users/users.component';
import { UserComponent } from './component/user/user.component';
import { PostsComponent } from './component/posts/posts.component';
import { PostComponent } from './component/post/post.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormsComponent } from './component/forms/forms.component';
import { FormComponent } from './component/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFirebaseCmsRoutingModule } from './ngx-firebase-cms-routing.module';
import { ExcelService } from './service/excel.service';
import { AuthService } from './service/auth.service';
import { FileService } from './service/file.service';
import { AuthGuard } from './guard/auth.guard';
import { UnauthGuard } from './guard/unauth.guard';
import { HelperService } from './service/helper.service';
import { EmailsComponent } from './component/emails/emails.component';
import { HttpClientModule } from '@angular/common/http';
const icons: IconDefinition[] = [ InboxOutline, CloudOutline, CloudUploadOutline, UserOutline, LockOutline, IdcardOutline, TeamOutline, FormOutline, SettingOutline, DesktopOutline, UnlockOutline, HddOutline, PictureOutline, MailOutline, ContactsOutline ];

registerLocaleData(en);

@NgModule({
  declarations: [
    DynamicBuilderComponent,
    DynamicFormComponent,
    EmailComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    FilesComponent,
    FileComponent,
    UsersComponent,
    UserComponent,
    PostsComponent,
    PostComponent,
    HomeComponent,
    ProfileComponent,
    FormsComponent,
    FormComponent,
    EmailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgZorroAntdModule,
    NgxFirebaseCmsRoutingModule
  ],
  exports: [
    SignupComponent
  ],
  providers: [
    ExcelService,
    AuthService,
    HelperService,
    FileService,
    AuthGuard,
    UnauthGuard,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' },
    { provide: NZ_ICONS, useValue: icons }
  ],
  entryComponents: [
    SignupComponent
  ]
})

export class NgxFirebaseCmsModule {
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: NgxFirebaseCmsModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    }
  }
}
