import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css']
})
export class AdminCompanyComponent implements OnInit {
  viewComp : string='AllCompanies';
  title : any;
  constructor(private routes: Router) { }

  ngOnInit() {
    // console.log(this.viewComp);
    this.viewComp = 'AllCompanies';
  }
  updateView(page){
    this.viewComp = page;
    this.title = page + ' Users List';

  }
}
