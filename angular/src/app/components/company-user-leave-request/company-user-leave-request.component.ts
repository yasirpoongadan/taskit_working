import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'company-user-leave-request',
  templateUrl: './company-user-leave-request.component.html',
  styleUrls: ['./company-user-leave-request.component.css']
})
export class CompanyUserLeaveRequestComponent implements OnInit {
  // reqtime = {additional_hours : '',id:''};
  userId;
  reason = { reject_reason: '', id: '' };
  accept = { id: '' }
  module_time: any;
  totalhr: any;
  arr1 = [];
  sum: any;
  showSpinner: boolean = false;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  myTasks: any;
  leavedata: any;
  // data = {"start_date":'',"end_date":'',"leave_hrs":'',
  //   "tbl_user_profile":{"f_name":''},
  //   "tbl_user_profile": {"tbl_login": {"profile_image":''}},
  // };
  constructor(
    private _activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private routes: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserid();
  }
  getUserid() {

    this._activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];

    });
    this.companyService.getuserleave(this.userId).subscribe(user => {

      // console.log(user);
      this.leavedata = user.leave;
      this.myTasks = user.mytask;

      this.myTasks.forEach((element, key) => {

        // console.log(element.)

        this.module_time = 0;
        this.totalhr = 0;
        element.tbl_project_modules.forEach((elm_tasks, key1) => {
          this.module_time = 0;
          elm_tasks.tbl_project_tasks.forEach(elm_tasks1 => {
            // console.log(elm_tasks1);

            this.module_time = this.module_time + elm_tasks1.planned_hour + elm_tasks1.buffer_hour;

            // console.log(this.module_time);
          })
          this.myTasks[key].tbl_project_modules[key1].ttlModHour = this.module_time;
          this.arr1.push(this.module_time);
        });



        this.sum = this.arr1.reduce((a, b) => a + b, 0);


      });
      // console.log(this.myTasks);
    });

  }

  getrejectId(id) {
    // console.log(id);
    this.reason.id = id;
  }
  getacceptId(id) {
    // console.log(id);
    this.accept.id = id;
  }

  Reject(reason) {
    //   console.log(reason);
    this.showSpinner = true;
    this.companyService.addReason(this.reason).subscribe(data => {

      if (!data.success) {
        this.showSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });

      }
      else if (data.success) {
        this.showSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
        this.closeBtn.nativeElement.click();
        this.routes.navigate(['/company-leave-request-list']);
        // this.getUserid();

      }

    });

  }

  Accept(accept) {
    //  console.log(accept);
    this.showSpinner = true;
    this.companyService.addaccept(this.accept).subscribe(data => {

      if (!data.success) {
        this.showSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });

      }
      else if (data.success) {
        this.showSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
        this.closeBtn1.nativeElement.click();
        this.routes.navigate(['/company-leave-request-list']);
        //  this.getUserid();

      }

    });

  }

  getHours(tasks: any) {
    let time = 0;
    tasks.forEach(element => {
      time = time + element.planned_hour + element.buffer_hour
    });
    return time
  }
  getTotalHours(total: any) {
    // console.log(total)
    //   let totalhr = 0;
    //   total.forEach(element => {
    //     // console.log("K"+element)
    //     element.forEach(element1 => {
    //       element1.forEach(element2 => {
    //     totalhr = totalhr+element2.planned_hour+element2.buffer_hour
    //   });
    //   });
    // });
    //   return totalhr
  }
}
