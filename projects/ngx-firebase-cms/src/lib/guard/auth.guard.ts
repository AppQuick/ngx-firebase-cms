import { Injectable, inject, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { EnvConfig } from '../interface/env-config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    @Inject('env') private config: EnvConfig,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let adminURL = this.config.adminURL || 'admin'
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        if (user && user.roles) {
          let roles = next.data["roles"] as Array<string>
          let isAuth = false
          user.roles.forEach(userRole => {
            if (roles.indexOf(userRole) > -1) {
              isAuth = true
            }
          })
          return isAuth
        } else {
          return false
        }
      }),
      tap(isAuth => {
        if (!isAuth) {
          this.auth.signOut().then(res => {
            this.router.navigate([`${adminURL}/login`])
          })
        }
      })
    )
  }
}
