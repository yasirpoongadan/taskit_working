import { Component, OnInit } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ViewChild, ElementRef } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../services/company.service';
@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
  token: any;

  newPassword = {
    email: '',
    captcha: ''

  }

  spinner: boolean = false;
  constructor(private companyService: CompanyService, public snackBar: MatSnackBar,private routes: Router) { }

  ngOnInit() {
  }
  handleCorrectCaptcha(event) {
    this.token = this.captcha.getResponse();
    // console.log(token);
  }
  reset(newPassword) {
    this.spinner = true;
    newPassword.captcha = this.token

    this.companyService.forgotPassword(this.newPassword).subscribe(data => {
      console.log("data");
      this.spinner = false;
      if (data.success == true) {
        let snackBarRef = this.snackBar.open('Reset password successfully.Please check your email', '', {
          duration: 2000
        });
        this.routes.navigate(['/company-login']); 
        if(this.captcha){
          this.captcha.reset();
        }
      }

      else {
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 3000
        });
        if(this.captcha){
          this.captcha.reset();
        }
      }


    });


  }
}
