import { Component, OnInit, Input, Inject } from '@angular/core';
import { Breadcrumb } from '../../interface/breadcrumb';
import { Router } from '@angular/router';
import { Titlebar } from '../../interface/titlebar';

@Component({
  selector: 'aq-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  @Input() data: Titlebar = {
    title: "",
    description: "",
    breadcrumbs: []
  }

  constructor(
    @Inject('env') public environment,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goTo(url) {
    if (url) {
      this.router.navigate([url])
    }
  }

  goToHome() {
    let adminUrl = (this.environment.adminUrl) ? this.environment.adminUrl : 'admin'
    this.router.navigate([adminUrl])
  }

}
