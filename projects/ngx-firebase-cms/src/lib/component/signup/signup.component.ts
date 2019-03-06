import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { EnvConfig } from '../../interface/env-config';

@Component({
  selector: 'aq-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  validateForm: FormGroup
  isLoading = false

  constructor(
    @Inject('env') private config: EnvConfig,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  submitForm() {
    let adminURL = this.config.adminURL || 'admin'
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid && !this.isLoading) {
      this.isLoading = true
      this.auth.signup(`${this.validateForm.value.userName}`, this.validateForm.value.password)
    }
  }

}
