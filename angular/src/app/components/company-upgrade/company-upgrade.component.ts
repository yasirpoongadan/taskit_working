import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-upgrade',
  templateUrl: './company-upgrade.component.html',
  styleUrls: ['./company-upgrade.component.css']
})
export class CompanyUpgradeComponent implements OnInit {
  private sub: any;
  plan_id: any;
  plan: any;
  formGroup: any;
  payment = {
    cardnum: '',
    cardname: '',
    cvv: '',
    fname: '',
    lname: '',
    addr: '',
    no: '',
    no_months: ''
  }

  constructor(private companyService: CompanyService, private _formBuilder: FormBuilder, private routes: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.plan_id = params.id;
      // ---------------------------------Start-------------------------------------------
      // Function      : get plan by id
      // Params        : id
      // Returns       : plan
      // Author        : Rinsha
      // Date          : 06-03-2018
      // Last Modified : 06-03-2018, Rinsha
      // Desc          : getplan
      this.companyService.getPlan(this.plan_id).subscribe(res => {
        this.plan = res;
      });
      // ---------------------------------End-------------------------------------------
    });

    this.formGroup = this._formBuilder.group({
      cardnumValidation: ['', Validators.required],
      cardnameValidation: ['', Validators.required],
      cvvValidation: ['', Validators.required],
      fnameValidation: ['', Validators.required],
      lnameValidation: ['', Validators.required],
      addrValidation: ['', Validators.required],
      noValidation: new FormControl('', Validators.pattern(/^\d{9}|^\d{3}-\d{3}-\d{3}|^\d{3}\s\d{3}\s\d{3}$/)),
      no_monthsValidation: ['', Validators.required],
    });
  }

  confirm(id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : upgrade
    // Params        : data from form
    // Returns       : message
    // Author        : Rinsha
    // Date          : 06-03-2018
    // Last Modified : 06-03-2018, Rinsha
    // Desc          : upgrade
    this.companyService.upgrade(id, this.payment).subscribe(res => {
      if (res.success == true) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
        this.routes.navigate(['/planlist']);
      }
      else {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
    });
    // ---------------------------------End-------------------------------------------
  }
}
