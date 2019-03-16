import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxFirebaseCMSModule } from 'projects/ngx-firebase-cms/src/public-api';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgZorroAntdModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxFirebaseCMSModule.forRoot(environment.ngxFirebaseCms)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
