import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { NgxFirebaseCmsModule } from 'ngx-firebase-cms';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './component/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase),
    NgxFirebaseCmsModule.forRoot(environment.ngxFirebaseCms)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
