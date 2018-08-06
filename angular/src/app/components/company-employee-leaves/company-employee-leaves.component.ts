import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
//import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'company-employee-leaves',
  templateUrl: './company-employee-leaves.component.html',
  styleUrls: ['./company-employee-leaves.component.css']
})
export class CompanyEmployeeLeavesComponent implements OnInit {
  displayedColumns = ['slno', 'name', 'leave_start_date', 'start_available_hrs', 'leave_end_date', 'end_available_hrs', 'action'];
  todayDate = new Date();
  dataSource: MatTableDataSource<any>;
  notExist = false;
  id: any;
  name: any;
  all_value = false;
  showSpinner: boolean = false;

  updateleave = {
    start_date: '',
    id: '',

    end_date: '',
    startavlhr: { hour: 0, minute: 0, second: 0 },
    endavlhr: { hour: 0, minute: 0, second: 0 },
    user_profile_id: '',
    leave_hrs: ''
  }

  newEmpleave = {
    startdate: '',
    startavlhr: { hour: 0, minute: 0, second: 0 },
    enddate: '',
    endavlhr: { hour: 0, minute: 0, second: 0 },
    emp_id: '',
    leave_hr: ''
  }
  time = { hour: 13, minute: 30 };

  // time;
  // time1;
  start: { hour: any, minute: any, second: any }
  end: { hour: any, minute: any, second: any }
  addLeave: Boolean = false;
  addSpinner :Boolean = false;
  editLeave: Boolean = false;
  editSpinner :boolean = false;
  deleteLEave: Boolean = false;
  dleteSpinner :Boolean = false;



  companyemployee: any;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }


  // ---------------------------------Start-------------------------------------------
  // Function      : project category master setting
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : All category
  constructor(
    private companyService: CompanyService,
    private routes: Router, public snackBar: MatSnackBar) { }


  refresh() {
    // console.log("hj");
    this.showSpinner = true
    //  console.log(this.selected);
    const company = [];

    this.companyService.getAllemployeeleaves().subscribe(data => {

      // console.log(data);
      // console.log(data[0].tbl_user_profile.f_name);

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
    this.newEmpleave.startavlhr = { hour: 0, minute: 0, second: 0 },
      this.newEmpleave.endavlhr = { hour: 0, minute: 0, second: 0 },
      this.todayDate.setDate(this.todayDate.getDate() + 1)
    this.refresh();
    this.companyService.getAllcompanyemployee().subscribe(res => {
      // console.log(res);
      this.companyemployee = res;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //tme validation
  // ctrl = new FormControl('', (control: FormControl) => {
  //   const value = control.value;

  //   if (!value) {
  //     return null;
  //   }

  //   if (value.hour < 12) {
  //     return {tooEarly: true};
  //   }
  //   if (value.hour > 13) {
  //     return {tooLate: true};
  //   }

  //   return null;
  // });
  // ctrl1 = new FormControl('', (control: FormControl) => {
  //   const value1 = control.value;

  //   if (!value1) {
  //     return null;
  //   }

  //   if (value1.hour < 12) {
  //     return {tooEarly: true};
  //   }
  //   if (value1.hour > 13) {
  //     return {tooLate: true};
  //   }
  //   // console.log(value1.hour);
  //   return null;
  // });


  //add empleave
  addNewEmpleave() {
    //this.showSpinner =false;
    //this.showSpinnerDelete =false;
    this.newEmpleave = {
      startdate: '',
      startavlhr: { hour: 0, minute: 0, second: 0 },
      enddate: '',
      endavlhr: { hour: 0, minute: 0, second: 0 },
      emp_id: '',
      leave_hr: ''
    }


  }

  getId(id) {
    // this.showSpinner =false
    // this.showSpinnerDelete =false
    this.id = id
    //  console.log(this.id)
  }


  //delete Employee leave
  deleteEmpleave(id) {
    // console.log(id);
    this.showSpinner = true
    this.companyService.deleteEmpleave(id).subscribe(data => {
      // console.log(data);
      if (data.success) {
        this.showSpinner = false
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
        this.refresh();
      }
      else {
        this.showSpinner = false
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
      }

    });

  }

  addEmpleave(newEmpleave) {
    this.addLeave = true;
    this.addSpinner =true;
    console.log(newEmpleave)
    // console.log(newEmpleave);

    this.showSpinner = true;
    // console.log(newCategory);
    this.companyService.addnewEmpleave(newEmpleave).subscribe(data => {
      if (!data.success) {
        this.addLeave = false;
        this.addSpinner =false;
        this.showSpinner = false
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });

        this.refresh();

      }
      else if (data.success) {
        this.addLeave = false;
        this.addSpinner =false;
        this.showSpinner = false
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000

        });
        this.closeBtn.nativeElement.click();
        this.refresh();
      }

    });

  }


  getEditId(id) {
    //  console.log(id);
    this.showSpinner = false;
    this.start = { hour: 0, minute: 0, second: 0 };
    this.end = { hour: 0, minute: 0, second: 0 }
    this.companyService.getSingleempleave(id).subscribe(data => {
      // console.log( data);
      let starthr = data.start_available_hrs.split(':');
      let endhr = data.end_available_hrs.split(':');
      this.updateleave = data;
      this.updateleave.startavlhr = { hour: starthr[0], minute: starthr[1], second: starthr[2] }
      this.updateleave.endavlhr = { hour: endhr[0], minute: endhr[1], second: endhr[2] }
      this.updateleave.user_profile_id = data.user_profile_id;
      this.updateleave.start_date = data.start_date;
      this.updateleave.end_date = data.end_date;

      //  console.log(start[0]);
      // console.log( data.start_available_hrs)
      // data.startavlhr={ hour:start[0],minute:start[1],second:start[2]};
      // data.endavlhr={ hour:end[0],minute:end[1],second:end[2]};
      //this.id = data.id;
      // console.log(this.updateleave);


      if (data.success == false) {
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
        this.refresh();

      }
      else {

      }


    });

  }

  updateEmployeeleave(updateleave) {
    this.editLeave = true;
    this.editSpinner =true;
    console.log(updateleave);
    this.showSpinner = true;
    this.companyService.updateEmpleave(this.updateleave).subscribe(data => {

      if (!data.success) {
        this.editLeave = false;
        this.editSpinner =false;
        this.showSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });

      }
      else if (data.success) {
        this.editLeave = false;
        this.editSpinner =false;
        this.showSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
        this.closeBtn1.nativeElement.click();
        this.refresh();

      }

    });

  }
  // -----------------------------------End------------------------------------------
}

