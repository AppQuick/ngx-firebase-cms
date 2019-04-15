import { Component, OnInit } from '@angular/core';
import { UploadFile, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpEvent } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { FileService } from '../../service/file.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../interface/post';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'aq-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  isShowUploadArea = false
  public files: Observable<any>

  constructor(
    public fileService: FileService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.files = this.afs.collection<Post[]>("posts", ref=> ref.where("type", "==", "media"))
    .snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))
      }),
      tap(res => console.log(res))
    )
  }

  open(id) {
    
  }
}
