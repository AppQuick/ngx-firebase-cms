import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, skipWhile } from 'rxjs/operators';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(
    private afs: AngularFirestore
  ) { }

  transform(id: string, arg: { keys: Array<string>, separator: string }): Observable<any> | any {
    if (!id) return of(null)
    return this.afs.collection("users").doc(id)
      .snapshotChanges()
      .pipe(
        map(res => { return {$key: res.payload.id, ...res.payload.data()}}),
        map(user => {
          let resultArray = []
          arg.keys.forEach(key => {
            if (user[key]) resultArray.push(user[key])
          })
          return resultArray.join(arg.separator || ",")
        })
      )
  }
}
