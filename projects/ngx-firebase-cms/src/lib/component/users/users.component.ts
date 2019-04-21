import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../interface/post';
import { HelperService } from '../../service/helper.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../service/auth.service';
import { mergeMap, map } from 'rxjs/operators';
import { Titlebar } from '../../interface/titlebar';
import { UnsubscriptionService } from '../../service/unsubscription.service';

@Component({
  selector: 'aq-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

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
  
  titlebar: Titlebar = {
    title: "Profile",
    description: "User Management",
    breadcrumbs: [
      {
        title: "Profile",
        icon: 'team'
      }
    ]
  }

  constructor(
    private unsubscription: UnsubscriptionService,
    private auth: AuthService,
    private afs: AngularFirestore,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.items = this.auth.user$.pipe(
      mergeMap(user => this.afs.collection(`users`, ref => this.helper.roleFilter(ref, user.roles, user.uid)).snapshotChanges()),
      map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() })))
    )
  }

  ngOnDestroy() { }

}
