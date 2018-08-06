import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
@Component({
  selector: 'user-leave-request',
  templateUrl: './user-leave-request.component.html',
  styleUrls: ['./user-leave-request.component.css']
})
export class UserLeaveRequestComponent implements OnInit {
  displayedColumns = ['slno', 'leave_start_date', 'start_available_hrs', 'leave_end_date', 'end_available_hrs', 'status', 'reason', 'action'];
  dataSource: MatTableDataSource<any>;
  preloader :Boolean = false;
  notExist = false;
  id: any;
  name: any;
  all_value = false;
  showSpinner: boolean = false;
  todayDate = new Date()
  private socket: any;
  updateleave = {
    start_date: '',
    id: '',
    end_date: '',
    startavlhr: '',
    endavlhr: '',

    // user_profile_id: '',
    leave_hrs: ''
  }
  addUserBtnDisable: Boolean = false;
  addUserSpinner: boolean = false;
  editUserBtnDisable: Boolean = false;
  editUserSpinner: boolean = false;
  deleteBtnDisable: Boolean = false;
  deleteSpinner: Boolean = false;


  newUserleave = {
    startdate: '',
    startavlhr: { hour: 0, minute: 0, second: 0 },
    endavlhr: { hour: 0, minute: 0, second: 0 },
    enddate: '',
    //  emp_id: '',
    leave_hr: ''
  }
  time = { hour: 13, minute: 30 };

  // time;
  // time1;




  //  companyemployee:any;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn9') closeBtn9: ElementRef;
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
    private userService: UserService,
    private routes: Router, public snackBar: MatSnackBar, private config: Config) {
    this.socket = socketIo(config.socketURL);
  }


  refresh() {

    // console.log("hj");
    this.showSpinner = true
    //  console.log(this.selected);
    const company = [];
    this.userService.getSingleUserallleaves().subscribe(data => {
      this.preloader = false;
      // console.log(data);
      // console.log(data[0].tbl_user_profile.f_name);

      this.loadToDataTable(data);
      this.showSpinner = false
    });

  }

  loadToDataTable(data) {
    console.log(data)
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
    this.newUserleave.startavlhr = { hour: 0, minute: 0, second: 0 },
      this.newUserleave.endavlhr = { hour: 0, minute: 0, second: 0 },
      this.refresh();
    this.socket.on('Rejectedleave', (data) => {
      this.refresh();
    });
    this.socket.on('Acceptedleave', (data) => {
      this.refresh();
    });
    // this.userService.getAllcompanyemployee().subscribe(res => {
    //   this.companyemployee = res;
    //  });
    this.todayDate.setDate(this.todayDate.getDate() + 1)
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
  addNewUserleave() {


    //this.showSpinner =false;
    //this.showSpinnerDelete =false;
    this.newUserleave = {
      startdate: '',
      startavlhr: { hour: 0, minute: 0, second: 0 },
      enddate: '',
      endavlhr: { hour: 0, minute: 0, second: 0 },
      // emp_id: '',
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
  deleteuserleave(id) {
    this.deleteBtnDisable = true;
    this.deleteSpinner = true;
    // console.log(id);
    this.showSpinner = true
    this.userService.deleteuserleave(id).subscribe(data => {
      // console.log(data);
      if (data.success) {
        this.deleteBtnDisable = false;
        this.deleteSpinner = false;
        this.showSpinner = false
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
        this.closeBtn9.nativeElement.click();
        this.refresh();
      }
      else {
        this.deleteBtnDisable = false;
        this.deleteSpinner = false;
        this.showSpinner = false
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
      }

    });

  }



  addUserleave(newUserleave) {
    // console.log(newUserleave);
    this.addUserBtnDisable = true
    this.addUserSpinner = true;
    // this.showSpinner = true;
    // console.log(newCategory);

    this.userService.addUserleave(newUserleave).subscribe(data => {
      if (!data.success) {
        this.addUserBtnDisable = false
        this.addUserSpinner = false;
        this.showSpinner = false
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });

        this.refresh();

      }
      else if (data.success) {
        this.addUserBtnDisable = false
        this.addUserSpinner = false;
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
    // console.log(id);
    this.showSpinner = false;
    this.userService.getSingleuserleave(id).subscribe(data => {
      // console.log( data);
      this.updateleave = data;
      // console.log(this.updateleave);
      let start = data.start_available_hrs.split(':');
      let end = data.end_available_hrs.split(':');
      //  console.log(start[0]);
      // console.log(data.start_available_hrs)
      data.startavlhr = { hour: start[0], minute: start[1], second: start[2] };
      data.endavlhr = { hour: end[0], minute: end[1], second: end[2] };
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

  updateUserleave(updateleave) {
    this.editUserBtnDisable = true;
    this.editUserSpinner = true;
    // console.log(updateleave);
    this.showSpinner = true;
    this.userService.updateUserleave(this.updateleave).subscribe(data => {

      if (!data.success) {
        this.editUserBtnDisable = false;
        this.editUserSpinner = false;
        this.showSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });

      }
      else if (data.success) {
        this.editUserBtnDisable = false;
        this.editUserSpinner = false;
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

