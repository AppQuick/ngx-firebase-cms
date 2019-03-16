import { Component, OnInit, OnDestroy } from '@angular/core';
import { en_US, NzI18nService } from 'ng-zorro-antd';
import { DocumentChangeAction, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { take, map, tap, catchError } from 'rxjs/operators';
import { Post } from '../../interface/post';
import { HelperService } from '../../service/helper.service';


@Component({
  selector: 'cms-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  items: Observable<Post[]>
  header = [
    {
      label: "Title",
      key: "title"
    },
    {
      label: "Author",
      key: "owner"
    },
    {
      label: "Last Update",
      key: "updatedTime"
    }
  ]

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private helper: HelperService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { 
  }

  ngOnInit() {
    console.log(this.auth.role)
    this.items = this.afs.collection(`posts`, ref => this.helper.postFilter(ref, this.auth.role, this.auth.uid)).snapshotChanges().pipe(
      map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() })))
    )
  }

}
