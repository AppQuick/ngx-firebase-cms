import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';
import { DisconnectOutline, LinkOutline, DeleteOutline, CodeOutline, MenuFoldOutline, MenuUnfoldOutline, UndoOutline, RedoOutline, BoldOutline, ItalicOutline, UnderlineOutline, StrikethroughOutline, AlignLeftOutline, AlignCenterOutline, AlignRightOutline, OrderedListOutline, UnorderedListOutline, FontSizeOutline, LineHeightOutline, BgColorsOutline, PlusOutline, MinusOutline, FontColorsOutline, SecurityScanOutline, HomeOutline, InboxOutline, UserOutline, LockOutline, IdcardOutline, TeamOutline, FormOutline, SettingOutline, DesktopOutline, UnlockOutline, HddOutline, PictureOutline, MailOutline, ContactsOutline, CloudOutline, CloudUploadOutline, BarsOutline } from '@ant-design/icons-angular/icons';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { DynamicBuilderComponent } from './component/dynamic-builder/dynamic-builder.component';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { FilesComponent } from './component/files/files.component';
import { UsersComponent } from './component/users/users.component';
import { PostsComponent } from './component/posts/posts.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormsComponent } from './component/forms/forms.component';
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
import { TitleBarComponent } from './directive/title-bar/title-bar.component';
import { EditorComponent } from './directive/editor/editor.component';
import { EditorToolbarComponent } from './directive/editor-toolbar/editor-toolbar.component';
const icons: IconDefinition[] = [ BarsOutline, DisconnectOutline, LinkOutline, DeleteOutline, CodeOutline, MenuFoldOutline, MenuUnfoldOutline,UndoOutline, RedoOutline, BoldOutline, ItalicOutline, UnderlineOutline, StrikethroughOutline, AlignLeftOutline, AlignCenterOutline, AlignRightOutline, OrderedListOutline, UnorderedListOutline, FontSizeOutline, LineHeightOutline, BgColorsOutline, PlusOutline, MinusOutline, FontColorsOutline, SecurityScanOutline, HomeOutline, InboxOutline, CloudOutline, CloudUploadOutline, UserOutline, LockOutline, IdcardOutline, TeamOutline, FormOutline, SettingOutline, DesktopOutline, UnlockOutline, HddOutline, PictureOutline, MailOutline, ContactsOutline];

registerLocaleData(en);

@NgModule({
  declarations: [
    DynamicBuilderComponent,
    DynamicFormComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    FilesComponent,
    UsersComponent,
    PostsComponent,
    HomeComponent,
    ProfileComponent,
    FormsComponent,
    EmailsComponent,
    TitleBarComponent,
    EditorComponent,
    EditorToolbarComponent
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