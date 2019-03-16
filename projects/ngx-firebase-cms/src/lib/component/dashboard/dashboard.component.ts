import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { EnvConfig } from '../../interface/env-config';
import { trigger, transition, style, animate } from '@angular/animations';
import { User } from '../../interface/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NzMessageService, NzI18nService, en_US } from 'ng-zorro-antd';

@Component({
  selector: 'cms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    "../../../../node_modules/ng-zorro-antd/ng-zorro-antd.min.css",
    './dashboard.component.css'
  ],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    )
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  now = new Date()
  brand = ""
  brandURL = "#"

  isCollapsed = false;
  isReverseArrow = false;
  width = 200;
  user: User
  isLoginPage = false;
  sub

  constructor(
    @Inject('env') private config: EnvConfig,
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService,
    private i18n: NzI18nService,
    private message: NzMessageService
  ) {
    this.i18n.setLocale(en_US);
    this.brand = this.config.brand || "AppQuick.co"
    this.brandURL = this.config.brandURL || "https://appquick.co"
  }

  ngOnInit() {
    this.sub = this.auth.user$.subscribe(user =>{ this.user = user}, err => this.message.error(err))
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  signout() {
    let adminURL = this.config.adminURL || 'admin'
    this.auth.signOut().then(res => this.router.navigate([`${adminURL}/login`]))
  }

}
