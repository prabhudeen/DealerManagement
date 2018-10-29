import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User, CommonService } from '../../shared/common.service';
import { SessionService } from '../../shared/session.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  login: FormGroup;
  user: User = new User();
  displayLogin = false;
  validuserNameLogin = false;
  validPasswordLogin = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private server: CommonService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.login = this.formBuilder.group({
      userName: [null, Validators.required],
      password: ['', Validators.required]
    });
    this.validateUser();
  }

  userNameValidationLogin(e) {
    // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (re.test(String(e).toLowerCase())) {
    //   this.validuserNameLogin = true;
    // } else {
    //   this.validuserNameLogin = false;
    // }
    if (e.length > 1) {
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

  onDealerLogin() {
    this.displayLogin = true;
  }

  onSubmit() {
    let headers = new HttpHeaders();
    headers = headers.append('username', this.login.value.userName).append('password', this.login.value.password);

     this.server.sendRequest('post', '/login', null, headers, null).subscribe(
      (data) => {
        if(data.status == 200) {
          this.sessionService.clear();
          this.sessionService.set('userName',this.login.value.userName);
          this.router.navigate(['table']);
        }
      }
    ); 

    // if (200 == 200) {
    //   this.sessionService.clear();
    //   this.sessionService.set('userName', this.login.value.userName);
    //   this.router.navigate(['table']);
    // }
  }

  validateUser() {
    if (this.sessionService.get('userName')) {
      console.log(this.sessionService.get('userName'));
      this.router.navigate(['table']);
    } else {
      this.router.navigate(['login']);
    }
  }

  validUser() {
    console.log("entered");
    console.log(this.validPasswordLogin);
    console.log(this.validuserNameLogin);
    return this.validuserNameLogin && this.validPasswordLogin;
  }

}
