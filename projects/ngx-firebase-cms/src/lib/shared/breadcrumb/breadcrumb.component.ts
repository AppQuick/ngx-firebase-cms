import { Component, OnInit, Inject, Input } from '@angular/core';
import { EnvConfig } from '../../interface/env-config';
import { UrlService } from '../../service/url.service';

@Component({
  selector: 'cms-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items = []

  constructor(
    @Inject('env') public config: EnvConfig,
    public urlService: UrlService
  ) { }

  ngOnInit() {
  }

}
