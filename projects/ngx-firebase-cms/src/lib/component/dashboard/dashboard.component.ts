import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { EnvConfig } from '../../interface/env-config';
import { trigger, transition, style, animate } from '@angular/animations';
import { User } from '../../interface/user';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UnsubscriptionService } from '../../service/unsubscription.service';

@Component({
  selector: 'aq-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../../../../../../node_modules/ng-zorro-antd/ng-zorro-antd.min.css',
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
export class DashboardComponent implements OnInit, OnDestroy {

  now = new Date()
  brand = ""
  brandURL = "#"

  isCollapsed = false
  isReverseArrow = false
  width = 200
  user: User
  isLoginPage = false

  constructor(
    @Inject('env') private config: EnvConfig,
    private afs: AngularFirestore,
    private unsubscription: UnsubscriptionService,
    private modal: NzModalService,
    private router: Router,
    private auth: AuthService,
    private message: NzMessageService
  ) {
    this.brand = this.config.brand || "AppQuick.co"
    this.brandURL = this.config.brandURL || "https://appquick.co"
  }

  ngOnInit() {
    this.auth.user$
    .pipe(
      this.unsubscription.untilComponentDestroyed(this)
    )
    .subscribe(user =>{ this.user = user}, err => {})
  }

  ngOnDestroy() {
  }

  logout() {
    let adminURL = this.config.adminURL || 'admin'
    this.modal.confirm({
      "nzTitle": '<i>Logout</i>',
      "nzIconType": "logout",
      "nzContent": `<b>Are you sure?</b>`,
      "nzOnOk": () => {
        return this.auth.signOut().then(res => {
          this.router.navigate([`${adminURL}/login`])
        })
      }
    })
  }

  getProfilePic() {
    return (this.user.profileURL) ? {'background-image': 'url(\'' + this.user.profileURL + '\')'} : {}
  }

}
