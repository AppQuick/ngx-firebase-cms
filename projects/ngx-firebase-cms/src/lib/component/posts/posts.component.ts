import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../interface/breadcrumb';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Titlebar } from '../../interface/titlebar';
import { FormBuilder, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '../../interface/editor';
import { Observable } from 'rxjs';
import { Post } from '../../interface/post';
import { TableHeader } from '../../interface/table';
import { AuthService } from '../../service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelperService } from '../../service/helper.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'aq-posts',
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

  showNewModal = false
  titlebar: Titlebar = {
    title: "Pages",
    description: "Page are building block of website",
    breadcrumbs: [
      {
        title: "Pages",
        icon: 'form'
      }
    ]
  }

  form = this.fb.group({
    'htmlContent': new FormControl('', [])
  })

  submit() {
    console.log(this.form.value)
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    private fb: FormBuilder,
    private unsubscription: UnsubscriptionService,
    private auth: AuthService,
    private afs: AngularFirestore,
    private helper: HelperService
  ) {
  }

  ngOnInit() {
    this.items = this.auth.user$.pipe(
      mergeMap(user => this.afs.collection(`posts`, ref => this.helper.roleFilter(ref, user['roles'], user['uid'], "post")).snapshotChanges()),
      map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))),
    )
  }

  ngOnDestroy() { }

  openForm() {
    this.showNewModal = !this.showNewModal
  }

}
