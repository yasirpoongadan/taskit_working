import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  private sub: any;
  msg: any;
  constructor(private route: ActivatedRoute, private companyService: CompanyService, public snackBar: MatSnackBar, private routes: Router, ) { }

  ngOnInit() {
    // ---------------------------------Start-------------------------------------------
    // Function      : Company verification
    // Params        : verification id
    // Returns       : 
    // Author        : Rinsha
    // Date          : 29-12-2017
    // Last Modified : 29-12-2017, Rinsha
    // Desc          : 
    this.sub = this.route.params.subscribe(params => {
      this.companyService.verifyCompany(params.id).subscribe(data => {
        this.msg = data.msg
        if (data.success) {
          // this._flashMessagesService.show('Success...', { cssClass: 'alert-success', timeout: 4000 });
          this.companyService.storeUserData(data.token, data.login);
          let snackBarRef = this.snackBar.open(this.msg, '', {
            duration: 2000
          });
          this.routes.navigate(['/company-login']);
          
          // this.routes.navigate(['/dashboard']); dashboard
          // setTimeout(() => {  

          // }, 2000);
        }
        else {
          // this._flashMessagesService.show('Error...', { cssClass: 'alert-danger', timeout: 4000 });
          let snackBarRef = this.snackBar.open(this.msg, '', {
            duration: 2000
          });
          this.routes.navigate(['/home']);
          setTimeout(() => {

          }, 2000);
        }
      });
    });
    // -----------------------------------End------------------------------------------
  }

}
