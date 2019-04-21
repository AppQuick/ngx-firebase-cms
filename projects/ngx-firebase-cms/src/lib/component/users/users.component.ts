import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../interface/breadcrumb';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Titlebar } from '../../interface/titlebar';

@Component({
  selector: 'aq-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  titlebar: Titlebar = {
    title: "Profile",
    description: "User Management",
    breadcrumbs: [
      {
        title: "Profile",
        icon: 'team'
      }
    ]
  }

  constructor(
    private unsubscription: UnsubscriptionService
  ) { }

  ngOnInit() {
  }

}
