import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Post } from 'ngx-firebase-cms/public_api';
import { AngularFirestore } from '@angular/fire/firestore';
=======
>>>>>>> ec7fa22fd10b762b6c0c765243b5c3b3a0b87c02

@Injectable({
  providedIn: 'root'
})
export class PostService {

<<<<<<< HEAD
  constructor(
    private afs: AngularFirestore
  ) { }

  public create(post: Post) {
    return this.afs.collection("posts").add(post)
  }
=======
  constructor() { }
>>>>>>> ec7fa22fd10b762b6c0c765243b5c3b3a0b87c02
}
