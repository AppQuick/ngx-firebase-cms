import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from '../../service/file.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../interface/post';
import { map } from 'rxjs/operators';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Titlebar } from '../../interface/titlebar';

@Component({
  selector: 'aq-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, OnDestroy {

  isShowUploadArea = false
  files: Observable<any>

  titlebar: Titlebar = {
    title: "Media Library",
    description: "Images uploaded here will be public and shared across users",
    breadcrumbs: [
      {
        title: 'Media Library',
        icon: 'picture'
      }
    ]
  }

  constructor(
    private unsubscription: UnsubscriptionService,
    public fileService: FileService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.files = this.afs.collection<Post[]>("posts", ref=> ref.where("type", "==", "media"))
    .snapshotChanges()
    .pipe(
      this.unsubscription.untilComponentDestroyed(this),
      map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))
      })
    )
  }

  ngOnDestroy() {
    
  }

  open(id) {
    
  }
}
