import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, User } from '../../../shared/common.service';
import { HttpHeaders } from '@angular/common/http';
import { ERROR_COLLECTOR_TOKEN } from '@angular/platform-browser-dynamic/src/compiler_factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent123 implements OnInit {
  login: FormGroup;
  invalid: boolean = false;
  user: User = new User();


  onSubmit() {
    let headers = new HttpHeaders();
    headers = headers.append('username', this.login.value.userName).append('password', this.login.value.password);
    this.server.sendRequest('post', '/login', null, headers, null).subscribe(
      (data) => {
        console.log(data);
        this.validateUser(data['status']);
      }
    );
    // this.validateUser(200);
  }

  validateUser(data) {
    if (data == 200) {
      this.user.username = this.login.value.userName;
      this.server.setUser(this.user);
      this.router.navigate(['table']);
    } else {
      this.router.navigate(['Login']);
    }
  }

  invalidUser() {
    return this.invalid;
  }

  validuserNameLogin = false;
  validPasswordLogin = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private server: CommonService) { }

  ngOnInit() {

    this.login = this.formBuilder.group({
      userName: [null, Validators.required],
      password: ['', Validators.required]
    });

  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  loginUser() {
    if (this.login.valid) {
      console.log('form is valid ! & Value = ' + JSON.stringify(this.login.value));
    } else {
      console.log('form is not valid ! & value= ' + this.login.value);
      this.validateAllFormFields(this.login);
    }
  }



  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  userNameValidationLogin(e) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
      this.validuserNameLogin = true;
    } else {
      this.validuserNameLogin = false;
    }

  }

  passwordValidationLogin(e) {
    if (e.length > 5) {
      this.validPasswordLogin = true;
    } else {
      this.validPasswordLogin = false;
    }
  }


}
