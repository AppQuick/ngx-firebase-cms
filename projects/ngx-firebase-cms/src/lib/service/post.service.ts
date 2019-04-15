import { Injectable } from '@angular/core';
import { Post } from 'ngx-firebase-cms/public_api';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afs: AngularFirestore
  ) { }

  public create(post: Post) {
    return this.afs.collection("posts").add(post)
  }
}
