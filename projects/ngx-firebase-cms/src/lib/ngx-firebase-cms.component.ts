import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'aq-ngx-firebase-cms',
  template: `
    <button nz-button nzType="primary">Test</button>
    <ul>
      <li class="text" *ngFor="let item of items | async">
        {{item.name}}
      </li>
    </ul>
  `,
  styleUrls: [
    "../../node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
  ]
})
export class NgxFirebaseCmsComponent implements OnInit {
  items: Observable<any[]>;

  constructor(
    db: AngularFirestore
  ) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.items = db.collection('item').valueChanges();
  }

  ngOnInit() {
  }

}
