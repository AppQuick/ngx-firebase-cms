import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxFirebaseCmsComponent } from './ngx-firebase-cms.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
registerLocaleData(en);

@NgModule({
  declarations: [
    NgxFirebaseCmsComponent
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgZorroAntdModule
  ],
  exports: [NgxFirebaseCmsComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
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
