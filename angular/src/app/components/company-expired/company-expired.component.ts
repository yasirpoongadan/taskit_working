import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
@Component({
  selector: 'company-expired',
  templateUrl: './company-expired.component.html',
  styleUrls: ['./company-expired.component.css']
})
export class CompanyExpiredComponent implements OnInit {

  constructor(private companyService: CompanyService, private routes: Router,) { }

  ngOnInit() {
  }
  logout(){
    this.companyService.logout();
    this.routes.navigate(['/home']);
    return false;
  }
}
