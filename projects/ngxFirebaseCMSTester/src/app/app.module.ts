import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxFirebaseCMSModule } from 'projects/ngx-firebase-cms/src/public-api';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxFirebaseCMSModule.forRoot(environment.ngxFirebaseCms)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
