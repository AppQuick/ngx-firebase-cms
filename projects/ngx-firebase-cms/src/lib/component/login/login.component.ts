import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvConfig } from '../../interface/env-config';


@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup
  isLoading = false

  constructor(
    @Inject('env') private config: EnvConfig,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid && !this.isLoading) {
      this.isLoading = true
      this.auth.login(`${this.validateForm.value.userName}`, this.validateForm.value.password)
    }
  }

}
