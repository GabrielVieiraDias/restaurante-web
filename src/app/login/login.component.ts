import { AuthenticationService } from './../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showMessageError = false;
  loginForm: FormGroup;
  logo = './assets/images/logo.png';
  returnUrl: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private translate: TranslateService) { }

  ngOnInit() {
    this.loginFormGroup();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get f() { return this.loginForm.controls; }

  OnSubmit() {
    this.showMessageError = false;

    this.authenticationService.login(this.loginForm.value).subscribe((data: any) => {
      if (data.authenticated) {
        this.authenticationService.setToken(data.access_token);
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.showMessageError = true;
      }
    },
      (err: HttpErrorResponse) => {
        this.showMessageError = true;

      });
  }

  closeInvalidUserMessage() {
    this.showMessageError = false;
  }
}
