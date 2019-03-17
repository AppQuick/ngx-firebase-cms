import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';
import { Post } from '../../interface/post';
import { HelperService } from '../../service/helper.service';
import { untilComponentDestroyed } from '../../service/helper.service';
import { TableHeader } from '../../interface/table';


@Component({
  selector: 'cms-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  items: Observable<Post[] | { $key: string }[]>
  header: Array<TableHeader> = [
    {
      label: "Title",
      key: "title",
      canFilter: true,
      routerLink: "../posts/${$key}"
    },
    {
      label: "Author",
      key: "author",
      pipe: "user",
      pipeParameter: {
        "keys": ["displayName"],
        "separator": ","
      },
      canSort: false
    },
    {
      label: "Last Update",
      key: "updatedTime",
      pipe: "date",
      pipeParameter: "medium",
      canSort: true,
    }
  ]

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private helper: HelperService
  ) {
  }

  ngOnInit() {
    this.items = this.auth.user$.pipe(
      mergeMap(user => this.afs.collection(`posts`, ref => this.helper.roleFilter(ref, user['roles'], user['uid'], "post")).snapshotChanges()),
      map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))),
      untilComponentDestroyed(this)
    )
  }

  ngOnDestroy() { }

}
