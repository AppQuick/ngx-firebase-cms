import { Component, OnInit } from '@angular/core';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Breadcrumb } from '../../interface/breadcrumb';
import { Titlebar } from '../../interface/titlebar';

@Component({
  selector: 'aq-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  titlebar: Titlebar = {
    title: "Email",
    description: "Send mass emails using template",
    breadcrumbs: [
      {
        title: "Emails",
        icon: 'inbox'
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
