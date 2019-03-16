<h1 align="center">
NGX-FIREBASE-CMS
</h1>

<div align="center">
🛑🛑UNDER DEVELOPMENT 🛑🛑
</div>

<div align="center">
🛑 DONT USE 🛑
</div>

<div align="center">
Angular Content Management System using Google Firebase (Authentication, Storage &amp; Firestore)

[![GitHub Release Date](https://img.shields.io/github/release-date/AppQuick/ngx-firebase-cms.svg?style=flat-square)](https://github.com/AppQuick/ngx-firebase-cms/releases)
[![npm package](https://img.shields.io/npm/v/ngx-firebase-cms.svg?style=flat-square)](https://www.npmjs.org/package/ngx-firebase-cms)
[![NPM downloads](http://img.shields.io/npm/dm/ngx-firebase-cms.svg?style=flat-square)](https://npmjs.org/package/ngx-firebase-cms)
[![GitHub license](https://img.shields.io/npm/l/ngx-firebase-cms.svg?style=flat-square)](https://github.com/AppQuick/ngx-firebase-cms/blob/master/LICENSE)

</div>

## Description
`ngx-firebase-cms` is a set of tool that combines the admin panel using `ng-zorro-antd` and backend linkage to Google Firebase with what developers need for their Angular project. It provides user authentication, file storage and firestore database using Google Firebase.

## Features
- User Authentication using Firebase Authentication
- Media upload using Firebase Storage
- Post CRUD using Firebase Firestore
- Admin Panel using `ng-zorro-antd`

## Environment Support
- Angular `^7.0.0`
- Modern browsers and Internet Explorer 11+ (with [polyfills](https://angular.io/guide/browser-support))

## Installation
### 1. Create a new project
```
ng new <project-name> --routing
cd <project-name>
```

### 2. Install NGX-FIREBASE-CMS
```
npm i -S ngx-firebase-cms
npm i -S @angular/fire firebase 
ng add ng-zorro-antd
```


### 3. Add Firebase config to environments variable
Open `/src/environments/environment.ts` and add your Firebase configuration. You can find your project configuration in the [Firebase Console](https://console.firebase.google.com/). From the project overview page, click Add Firebase to your web app.
```
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  },
  ngxFirebaseCms: {
    
  }
};
```
### 4. Setup @NgModule for the NgxFirebaseCMSModule and edit `app.component.html`
Open `/src/app/app.module.ts`, inject the NgxFirebaseCms and BrowserAnimationsModule providers, and specify your NgxFirebaseCms configuration.
```

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { NgxFirebaseCMSModule } from 'ngx-firebase-cms';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
...

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxFirebaseCMSModule.forRoot(environment.ngxFirebaseCms)
    ...
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

Open `/src/app/app.component.html`, replace with `<router-outlet></router-outlet>`

### 5. Enable Email/Password Authenication Provider
Open `console.firebase.google.com` and go to `Develop > Authentication > Sign-in method`

### 6. Amend the Rules for firestore
Open `console.firebase.google.com` and go to `Develop > Database > Cloud Firestore > Rules`
Temporarily, allow read/write access on all documents to any user signed in to the application
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null
    }
  }
}
```
> This is temporary settings, it is not safe as everyone could register to be a user using any email.

### 7. Add ngx-firebase-cms Admin Panel to route module
Open `app-routing.module.ts` and add the `NgxFirebaseCMSModule`

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxFirebaseCMSModule } from 'ngx-firebase-cms';

const routes: Routes = [
  { path: 'admin', loadChildren: () => NgxFirebaseCMSModule },
  /***
    Your other routes
  ***/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
> The Admin Panel is now at `localhost:4200/admin` or you could change the `admin` to any other url
> You should consider to add `https` cert for production use.

### 8. Run your app
```
ng serve
```
Run the serve command and navigate to `http://localhost:4200` in your browser.
The default route for Admin Panel is at `http://localhost:4200/admin`

### 9. Next step
Next Step: [Documents](#)

## Usage
- coming soon

## Development
- coming soon

## Road Map
- coming soon

## Contributing
- coming soon

## Users
- coming soon

## License
- GNU GPLv3
