import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AdminService } from './../../services/admin.service'

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  counts: any;
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.adminService.getCountsforAdminDashboard().subscribe(resCounts =>{
      // console.log(resCounts)
      this.counts = resCounts;
    });
  }

}
