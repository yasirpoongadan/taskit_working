import { Component, ViewChild, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-activity-log',
  templateUrl: './user-activity-log.component.html',
  styleUrls: ['./user-activity-log.component.css']
})
export class UserActivityLogComponent implements OnInit {
  preloader: Boolean = false;
  displayedColumns = ['slno', 'date', 'time', 'action'];
  dataSource: MatTableDataSource<any>;
  notExist = false;
  startDate: Date;
  endDate: Date;
  showSpinner: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public options: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,

  };
  // ---------------------------------Start-------------------------------------------
  // Function      : UserActivitylog
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 16-03-2018
  // Last Modified : 
  // Desc          : UserActivitylog
  constructor(

    private userService: UserService,
    private routes: Router, public snackBar: MatSnackBar) { }


  refresh() {
    this.showSpinner = true
    this.userService.getSingleUserActivitylog().subscribe(data => {
      this.preloader =false;
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
    this.preloader =true;

    this.refresh();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  public selectedStartDate(value: any, datepicker?: any) {
    this.startDate = value.start;
    this.endDate = value.end;
    let data = { startDate: this.startDate, endDate: this.endDate }
    this.userService.getDatefilterforlog(data).subscribe(res => {
      console.log(res);
      this.loadToDataTable(res);

    });

  }










  // -----------------------------------End------------------------------------------
}

