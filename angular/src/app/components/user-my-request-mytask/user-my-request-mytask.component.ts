import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'user-my-request-mytask',
  templateUrl: './user-my-request-mytask.component.html',
  styleUrls: ['./user-my-request-mytask.component.css']
})
export class UserMyRequestMytaskComponent implements OnInit {
  preloader:Boolean = false;
  displayedColumns = ['slno', 'taskname', 'date', 'time', 'status'];
  dataSource: MatTableDataSource<any>;
  notExist = false;
  all_value = false;
  showSpinner: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // ---------------------------------Start-------------------------------------------
  // Function      :  MY REQUEST
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 29-03-2018
  // Last Modified : 
  // Desc          : my request status
  constructor(
    private userService: UserService,
    private routes: Router, public snackBar: MatSnackBar) { }

  refresh() {
    this.showSpinner = true
    this.userService.getAllMyNewTaskrequest().subscribe(data => {
      this.preloader = false;
      console.log(data)

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
    this.preloader = true;
    this.refresh();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // -----------------------------------End------------------------------------------
}
