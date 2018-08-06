import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  newLogin = {
    email: '',
    password: '',
  }
  showError: Boolean = false;
  showSpinner: Boolean = false;
  Error = '';

  constructor(private adminService: AdminService, private routes: Router, public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  // ---------------------------------Start-------------------------------------------
  // Function      : Admin Login
  // Params        : admin username,admin password from form
  // Returns       : Token, admin id and role
  // Author        : Rinsha
  // Date          : 01-03-2018
  // Last Modified : 01-03-2018, Rinsha
  // Desc          : Admin login

  login() {
    this.showSpinner = true
    // console.log(this.newLogin);
    this.adminService.adminLogin(this.newLogin).subscribe(data => {
      console.log(data);
      if (data.success == false) {
        //  this.showSpinner =false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 3000
        });
      }
      if (data.success) {
        //  this.showSpinner =false
        this.adminService.storeUserData(data.token, data.admin);
         this.routes.navigate(['/admin-dashboard']);
      }
    });
  }
  // -----------------------------------End------------------------------------------
}
