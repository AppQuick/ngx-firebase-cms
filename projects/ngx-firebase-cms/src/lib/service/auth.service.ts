import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import * as firebase from 'firebase/app';
import { EnvConfig } from '../interface/env-config';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  uid: string;
  displayName: string;
  email: string;
  profileURL: string;
  emailVerified : boolean;
  lastLogin: Date;
  role: string;

  constructor(
    @Inject('env') private config: EnvConfig,
    private afAuth: AngularFireAuth,
    private message: NzMessageService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      tap(res => {
        if (res) {
          this.uid = res["uid"]
          this.email = res["email"]
          this.emailVerified = res["emailVerified"]
          this.lastLogin = new Date(res["metadata"]["lastSignInTime"])
        }
      }),
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }),
      tap(user => {
        if (user) {
          this.displayName = user["displayName"]
          this.profileURL = user["profileURL"]
          this.role = user["role"]
        }
      })
    )
  }

  public login(username, password) {
    let adminURL = this.config.adminURL || 'admin'
    this.afAuth.auth.signInWithEmailAndPassword(username, password)
    .then(res => {
      this.router.navigate([`${adminURL}/dashboard`])
    }).catch(err => {
      this.message.error(err)
    })
  }

  public signup(username, password) {
    let adminURL = this.config.adminURL || 'admin'
    this.afAuth.auth.createUserWithEmailAndPassword(username, password).then(res => {
      let data = {
        uid: res['user']['uid'],
        email: res['user']['email'],
        displayName: res['user']['email'],
        emailVerified: false,
        createdTime: firebase.firestore.FieldValue.serverTimestamp(),
        updatedTime: firebase.firestore.FieldValue.serverTimestamp(),
        lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
        roles: ["Contributor"]
      }
      if (res['user']['uid']) {
        this.afs.collection("users").doc(res['user']['uid']).set(data)
        .then(res => {
          this.router.navigate([`${adminURL}/dashboard`])
        })
        .catch(err => {
          this.message.error(err)
        })
      }
    })
  }

  signOut() {
    return this.afAuth.auth.signOut()
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: ["Contributor"] 
    }
    return userRef.set(data, { merge: true })
  }


  ///// Role-based Authorization //////
  canRead(user: User): boolean {
    const allowed = ['Administrator', 'Editor', 'Author', 'Contributor']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['Administrator', 'Editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['Administrator']
    return this.checkAuthorization(user, allowed)
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }
}
