import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
   
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  
  }

  login(formValue) {
    this.authenticationService.login(formValue)
    }
}