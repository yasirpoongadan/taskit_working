import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ViewChild, ElementRef } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { ReCaptchaComponent } from 'angular2-recaptcha';
@Component({
  selector: 'company-login',

  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
  newLogin = {
    email: '',
    password: '',
    captcha: ''
  }
  spinner: Boolean = false;
  showCaptcha: Boolean = false;
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
  public verified: any;
  public siteKey: string = "sitekey";//example: 6LdEnxQTfkdldc-Wa6iKZSelks823exsdcjX7A-N
  public theme: string = "light";//you can give any google themes light or dark
  setVerified(data) {
    // console.log("dfd");
    // console.log(data) // data will return true while successfully verified 
  }
  msg: any;
  token: any;
  constructor(private companyService: CompanyService, private routes: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    // ---------------------------------Start-------------------------------------------
    // Function      : Get logged in entity
    // Params        : 
    // Returns       : Get logged in entity
    // Author        : Rinsha
    // Date          : 08-03-2018
    // Last Modified : 08-03-2018, Rinsha
    // Desc          :  
    this.companyService.getLoggedinEntity().subscribe(data => {
      // if(data == null || data == ''){
      //   this.routes.navigate(['/company-login']); 
      // }
      if(data.role_id == 2){
        //super admin
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/home']); 
        }
        this.routes.navigate(['/admin-dashboard']);
      }
      if(data.role_id == 3 || data.role_id == 1){
        //company admin or pm
        if(data.delete_status == true || data.block_status == true || data.cmp_status == "Not Verified"){
          this.routes.navigate(['/company-login']); 
        }
        if(data.cmp_status == "Expired"){
          this.routes.navigate(['/expired']);
        }
        if(data.is_profile_completed == false){
          this.routes.navigate(['/compay-aditninfo', data.cmp_id]);
        }
        this.routes.navigate(['/company-dashboard']);
      }
      if(data.role_id == 4){
        //user
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/company-login']); 
        }
        this.routes.navigate(['/user-dashboard']);
      }
    });
    // -----------------------------------End------------------------------------------
    // this.companyService.getLoggedUSerDetails().subscribe(info => {
    //   console.log(info);
    //   if (info == null || info == '') {
    //     this.routes.navigate(['/company-login']);
    //   }

    //   if (info.role_id == 1) {
    //     if (info.delete_status == true || info.block_status == true || info.cmp_status == "Not Verified") {
    //       this.routes.navigate(['/company-login']);
    //     }
    //     if (info.cmp_status == "Expired") {
    //       // this.routes.navigate(['/expired']); expired
    //     }
    //     if (info.is_profile_completed == false) {
    //       // this.routes.navigate(['/additnInfo', info.cmp_id]); additional info
    //     }
    //     this.routes.navigate(['/dashboard']); 
    //   }
    //   if (info.role_id == 3 || info.role_id == 4) {
    //     if (info.delete_status == true || info.block_status == true) {
    //       // this.routes.navigate(['/404']); 404
    //     }

    //     this.routes.navigate(['/dashboard']);  
    //   }
    // });
  }
  handleCorrectCaptcha(event) {
    this.token = this.captcha.getResponse();
    // console.log(token);

  }
  login(newLogin) {
    this.spinner = true;
    if(this.newLogin.email == '' || this.newLogin.password == ''){
      let snackBarRef = this.snackBar.open('Please fill username and password properly!', '', {
        duration: 2000
      });
      this.spinner = false;
    }
    else{
      newLogin.captcha = this.token
      // console.log(newLogin);
      this.companyService.authenticateCompany(this.newLogin).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.spinner = false;
          if (data.login.status == "Expired") {
            console.log("expired");
            var json = data.login;
            var key = "status";
            delete json[key];
            this.companyService.storeUserData(data.token, data.login);
            this.routes.navigate(['/expired']);
          }
          else {
            // console.log("esle");
            this.spinner = false;
            var json = data.login;
            var key = "status";
            delete json[key];
            this.companyService.storeUserData(data.token, data.login);
            if (this.captcha) {
              this.captcha.reset();
            }
            if (data.login.role_id == 4) {
              this.routes.navigate(['/user-dashboard']);
            }
            else {
              this.routes.navigate(['/company-dashboard']);
            }
          }
        }
        else if (data.profile_complete == false) {
          // console.log("profile");
          this.routes.navigate(['/compay-aditninfo/' + data.cmp_id]);
          // var json = data.login;
          // var key = "profile";
          // delete json[key];
          this.companyService.storeUserData(data.token, data.login);
        }
        else {
          this.spinner = false;
          if (this.captcha) {
            this.captcha.reset();
          }
          if (data.caseno != null || data.caseno != '' || data.caseno == []) {
            if (data.caseno == 1) {
              // console.log(data.caseno);
              this.showCaptcha = true;
              // console.log(this.showCaptcha);
            }
          }
          this.msg = data.msg;
          let snackBarRef = this.snackBar.open(this.msg, '', {
            duration: 2000
          });
          if (this.captcha) {
            this.captcha.reset();
          }
        }
      });
    }
   
  }


}
