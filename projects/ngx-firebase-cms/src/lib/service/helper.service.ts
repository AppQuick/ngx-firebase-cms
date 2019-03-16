import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  postFilter(ref, role, uid) {
    if (role == "Superadmin") {
      return ref.orderBy('updatedTime', 'desc')
    } else if (role == "Administrator") {
      return ref.orderBy('updatedTime', 'desc')
    } else if (role == "Editor") {
      return ref.orderBy('updatedTime', 'desc')
    } else if (role == "Author") {
      return ref => ref.where('post_author', 'array-contains', uid).orderBy('updatedTime', 'desc')
    } else if (role == "Contributor") {
      return ref => ref.where('post_author', '==', uid).orderBy('updatedTime', 'desc')
    } else if (role == "Subscriber") {
      return ref.where('status', '==', 'published').orderBy('updatedTime', 'desc')
    } else {
      return ref.orderBy('updatedTime', 'desc')
    }
  }
}
