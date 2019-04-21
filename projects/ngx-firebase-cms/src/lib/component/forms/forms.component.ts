import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Breadcrumb } from '../../interface/breadcrumb';
import { Titlebar } from '../../interface/titlebar';

@Component({
  selector: 'aq-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit, OnDestroy {

  titlebar: Titlebar = {
    title: "Form Builder",
    description: "Form builder helps you to create form for your other users",
    breadcrumbs: [
      {
        title: "Form Builder",
        icon: 'hdd'
      }
    ]
  }

  constructor(
    private unsubscription: UnsubscriptionService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

}
