import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { EnvConfig } from '../interface/env-config';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(
    @Inject('env') private config: EnvConfig,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let adminURL = this.config.adminURL || 'admin'
    return this.afAuth.authState.pipe(
      map((authState) => !authState),
      tap(unauthenticated => {
        if (!unauthenticated) {
          this.router.navigate([`${adminURL}/dashboard`])
          this.router.navigate(['/a/dashboard'])
        }
      })
    )
  }
  
}
