import { Injectable } from '@angular/core';
import { UploadXHRArgs, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../interface/post';
import { AuthService } from './auth.service';
import { HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private auth: AuthService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private message: NzMessageService
  ) { }

  private save(post: Post) {
    return this.afs.collection("posts").add(post)
  }

  public beforeUpload = (file: UploadFile): boolean => {
    if(file['type'] != "image/jpeg") {
      this.message.error("File type should be JPEG")
      return false
    } else if (file['size']/1024/1024 > 1) {
      this.message.error("File size should be less than 1 Mb")
      return false
    } else {
      return true
    }
  }

  public massUploadFile = (item: UploadXHRArgs) => {
    let timestamp = new Date().valueOf()
    let filePath = `/media/${timestamp}.jpeg`
    let file = item['file']
    const task = this.storage.upload(filePath, file)
    .then(res => {
      return this.storage.ref(filePath).getDownloadURL().toPromise()
    })
    .then(url => {
      return this.save({
        title: "Untitled Media",
        author: this.auth.uid,
        mime: file.type,
        url: url,
        createdTime: firebase.firestore.FieldValue.serverTimestamp(),
        type: "media"
      })
    })
    .then(url => {
      this.message.success(`Successfully upload an image`)
    })
    .catch(err => {
      this.message.error(err)
    })
    return of().subscribe((event: HttpEvent<{}>) => {
      if (event['percent'] != 100) {
        item.onProgress(event, item.file);
      } else {
        item.onSuccess(event['body'], item.file, event);
      }
    }, (err) => {
      item.onError(err, item.file);
    })
  }
}
