import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'company-leave-request-list',
  templateUrl: './company-leave-request-list.component.html',
  styleUrls: ['./company-leave-request-list.component.css']
})
export class CompanyLeaveRequestListComponent implements OnInit {
  private socket: any;
  displayedColumns = ['slno', 'name', 'start_date', 'start_available_hrs', 'end_date', 'end_available_hrs', 'request_status', 'action'];
  dataSource: MatTableDataSource<any>;
  notExist = false;
  id: any;
  name: any;
  all_value = false;
  showSpinner: boolean = false;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // ---------------------------------Start-------------------------------------------
  // Function      : project category master setting
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : All category
  constructor(
    private companyService: CompanyService, private config: Config,
    private routes: Router, public snackBar: MatSnackBar, ) { this.socket = socketIo(config.siteUrl) }


  refresh() {
    // // console.log("hj");
    this.showSpinner = true
    //  // console.log(this.selected);
    const company = [];

    this.companyService.getAllemppendingleaves().subscribe(data => {
      // console.log(data)
      this.loadToDataTable(data);
      this.showSpinner = false
    });
  }

  loadToDataTable(data) {

    this.notExist = false;
    if (data.length == 0) {
      this.notExist = true;
    }
    this.dataSource = new MatTableDataSource(data);
    // // console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.refresh();
    this.socket.on('Leaveaddeduser', (data) => {
      this.refresh();
    });
    this.socket.on('deleteLeaveuser', (data) => {
      this.refresh();
    });
    this.socket.on('Rejectedleave', (data) => {
      this.refresh();
    });
    this.socket.on('Acceptedleave', (data) => {
      this.refresh();
    });

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }





  // -----------------------------------End------------------------------------------
}

