import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Breadcrumb } from '../../interface/breadcrumb';
import { Titlebar } from '../../interface/titlebar';
import { Post } from '../../interface/post';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../service/auth.service';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import { HelperService } from '../../service/helper.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'aq-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  titlebar: Titlebar = {
    title: "Email",
    description: "Send mass emails using template",
    breadcrumbs: [
      {
        title: "Emails",
        icon: 'inbox'
      }
    ]
  }

  items: Observable<Post[] | { $key: string }[]>
  header = [
    {
      label: "Title",
      key: "title"
    },
    {
      label: "Author",
      key: "author",
      pipe: "user",
      pipeParameter: {
        "keys": ["displayName"],
        "separator": ","
      }
    },
    {
      label: "Last Update",
      key: "updatedTime",
      pipe: "date",
      pipeParameter: "medium"
    }
  ]

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private helper: HelperService,
    private unsubscription: UnsubscriptionService
  ) { }

  ngOnInit() {
    this.items = this.auth.user$.pipe(
      mergeMap(user => this.afs.collection(`posts`, ref => this.helper.roleFilter(ref, user.roles, user.uid, "email")).snapshotChanges()),
      map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))),
      takeUntil(this.unsubscription.componentDestroyed(this))
    )
  }

  ngOnDestroy() { }

}
