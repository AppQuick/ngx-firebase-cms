import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../interface/breadcrumb';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { Titlebar } from '../../interface/titlebar';
import { FormBuilder, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '../../interface/editor';

@Component({
  selector: 'aq-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  
  showNewModal = false
  titlebar: Titlebar = {
    title: "Pages",
    description: "Page are building block of website",
    breadcrumbs: [
      {
        title: "Pages",
        icon: 'form'
      }
    ]
  }

  form = this.fb.group({
    'htmlContent': new FormControl('', [])
  })

  submit() {
    console.log(this.form.value)
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    private fb: FormBuilder,
    private unsubscription: UnsubscriptionService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

  openForm() {
    this.showNewModal = !this.showNewModal
  }

}
