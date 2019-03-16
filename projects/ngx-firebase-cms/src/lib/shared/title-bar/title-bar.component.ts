import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'cms-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  @Input() title = ""
  @Input() buttons = []
  @Input() uploadButtons = []
  @ViewChild('uploadBtn') uploadBtn: ElementRef

  constructor() { }

  ngOnInit() {
  }

}
