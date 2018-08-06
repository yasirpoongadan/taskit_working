import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  plans : any;
  private socket: any;

  constructor(private config: Config, private adminService: AdminService, private routes: Router) {
    this.socket = socketIo(config.siteUrl);
   }

  ngOnInit() {
    this.socket.on('addPlan', (data) => {
      this.getPlans();
    });
    this.socket.on('bestPlan', (data) => {
      this.getPlans();
    });
    this.socket.on('deletePlan', (data) => {
      this.getPlans();
    });
    this.socket.on('updatePlan', (data) => {
      this.getPlans();
    });
    this.getPlans();
  }

  getPlans() {
    // ---------------------------------Start-------------------------------------------
    // Function      : get all plans without default
    // Params        : 
    // Returns       : 
    // Author        : Rinsha
    // Date          : 06-03-2018
    // Last Modified : 06-03-2018, Rinsha
    // Desc          : getAllplans without default
    this.adminService.getPlansWithoutDefault().subscribe(res => {
      // console.log(res);
      this.plans = [];
      res.forEach(element => {
        // if(element.is_default_plan == false){
          this.plans.push(element);
        // }
      });
    });
    // ---------------------------------End-------------------------------------------
  }

}
