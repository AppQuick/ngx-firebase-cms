import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { NgxFirebaseCmsModule } from 'ngx-firebase-cms';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxFirebaseCmsModule.forRoot(environment.ngxFirebaseCms)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
