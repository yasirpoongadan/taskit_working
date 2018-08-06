import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
@Component({
  selector: 'company-request-management',
  templateUrl: './company-request-management.component.html',
  styleUrls: ['./company-request-management.component.css']
})
export class CompanyRequestManagementComponent implements OnInit {
  private socket: any;
  displayedColumns = ['slno', 'name', 'projectname', 'taskname', 'status', 'action'];
  dataSource: MatTableDataSource<any>;
  notExist = false;
  id: any;
  selected = 'all';
  all_value = false;
  showSpinner: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // ---------------------------------Start-------------------------------------------
  // Function      : Admin user management
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : All users
  constructor(
    private companyService: CompanyService, private config: Config,
    private routes: Router, public snackBar: MatSnackBar) { this.socket = socketIo(config.siteUrl) }


  refresh() {
    this.showSpinner = true

    const company = [];

    this.companyService.getAlltimeextensionrequest().subscribe(data => {
      // console.log(data);
      if (data.length != 0) {
        this.all_value = true;
      }

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
    // console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.refresh();
    this.socket.on('timeextention', (data) => {
      this.refresh();
    });
    this.socket.on('Rejectedtimeext', (data) => {
      this.refresh();
    });
    this.socket.on('sendtoadmin', (data) => {
      this.refresh();
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getId(id) {
    // this.showSpinner =false
    // this.showSpinnerDelete =false
    this.id = id
    //  console.log(this.id)
  }

  // -----------------------------------End------------------------------------------
}

