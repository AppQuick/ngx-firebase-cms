import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DocumentChangeAction, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cms-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  @Input() set data(value: any) {
    this.displayData = value
    this.getFilterList()
    this.tableLoading = false
  }
  @Input() header = []
  displayData = []
  tableLoading = true
  noPerPage = 10
  sortName
  sortValue
  listOfSearchValue = []
  searchKey
  filterList = {}

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
  }

  private getFilterList() {
    this.filterList = {
      "projectCode": [],
      "description": [],
      "type": [],
      "dateRange": [],
      "owner": [],
    }
    if (this.data && this.data.length > 0) {
      this.filterList['projectCode'] = this.data.map(res => res['projectCode']).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => (a > b ? 1 : -1)).map(res => {
        return { "text": res, "value": res }
      })
      this.filterList['description'] = this.data.map(res => res['description']).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => (a > b ? 1 : -1)).map(res => {
        return { "text": res, "value": res }
      })
      this.filterList['type'] = this.data.map(res => res['type']).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => (a > b ? 1 : -1)).map(res => {
        return { "text": res, "value": res }
      })
      this.filterList['dateRange'] = this.data.map(res => res['dateRange']).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => (a > b ? 1 : -1)).map(res => {
        return { "text": res, "value": res }
      })
    }
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(event, uuid): void {
    this.listOfSearchValue = event;
    this.searchKey = uuid;
    this.search();
  }

  search(): void {
    const filterFunc = item => (this.listOfSearchValue.length ? this.listOfSearchValue.some(name => item[this.searchKey].indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  

}
