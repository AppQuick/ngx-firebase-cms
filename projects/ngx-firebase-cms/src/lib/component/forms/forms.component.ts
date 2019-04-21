import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Breadcrumb } from '../../interface/breadcrumb';
import { Titlebar } from '../../interface/titlebar';
import { Observable } from 'rxjs';
import { Post } from '../../interface/post';
import { AuthService } from '../../service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelperService } from '../../service/helper.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'aq-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit, OnDestroy {

  titlebar: Titlebar = {
    title: "Form Builder",
    description: "Form builder helps you to create form for your other users",
    breadcrumbs: [
      {
        title: "Form Builder",
        icon: 'hdd'
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
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.items = this.auth.user$.pipe(
      mergeMap(user => this.afs.collection(`posts`, ref => this.helper.roleFilter(ref, user.roles, user.uid, "form")).snapshotChanges()),
      map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() })))
    )
  }

  ngOnDestroy() { }

}
