import { Component, OnInit, Input } from '@angular/core';
import { getInterpolation } from '../../service/helper.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aq-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  @Input() set data(value: any) {
    this.fullData = value
    this.displayData = value
    this.tableLoading = false
    this.getFilterList()
  }
  @Input() headers = []
  fullData = []
  displayData = []
  tableLoading = true
  noPerPage = 10

  // sort & filter
  sortName
  sortValue
  listOfSearchValue = []
  searchKey
  filterList = {}
 

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  /* Filtering & Sorting */
  getFilterList() {
    let filterKeys = this.headers.filter(res => res['canFilter']).map(res => res['key'])
    filterKeys.forEach(key => {
      this.filterList[key] = this.fullData.map(res => res[key]).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => (a > b ? 1 : -1)).map(res => {return { "text": res, "value": res }})
    })
  }

  sort(sort: { key: string, value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(event, uuid) {
    this.listOfSearchValue = event;
    this.searchKey = uuid;
    this.search();
  }

  search() {
    const filterFunc = item => this.listOfSearchValue.length ? this.listOfSearchValue.some(name => item[this.searchKey].indexOf(name) !== -1) : true;
    const data = this.fullData.filter(item => filterFunc(item))
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1))
    } else {
      this.displayData = data
    }
  }

  goTo(url, data) {
    if (url) {
      getInterpolation(url).forEach(key => {
        let replacement = data[key] || ""
        url = url.split("${"+key+"}").join(replacement)
      })
      this.router.navigate([url], {relativeTo: this.route})
    }
  }
  

}
