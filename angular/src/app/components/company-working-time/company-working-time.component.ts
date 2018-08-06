import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
// import async from 'async'; 
declare var $: any;
@Component({
  selector: 'app-company-working-time',
  templateUrl: './company-working-time.component.html',
  styleUrls: ['./company-working-time.component.css']
})
export class CompanyWorkingTimeComponent implements OnInit {
  addBreakBtnDisable: Boolean = false;
  addBreakSpinner: Boolean = false;
  editWorkinBtnDisable: Boolean = false;
  editWorkingSpinner: Boolean = false;
  default: any;
  otherTimings: any;
  breaks: any;
  show = false;
  showTbl = false;
  startTime: any;
  endTime: any;
  breakStartTime = { hour: 0, minute: 0 };
  breakEndTime = { hour: 0, minute: 0 };
  BreakId = '';
  time = { hour: 0, minute: 0 };
  meridian = true;
  breakTitle: any;
  spinner = false;
  timings: any;
  holiday = false;
  dayBreak: any
  showAddBreak = false;
  selectedDay: any;
  selectedWeek: any;
  specificTime: any;
  xtime = { hour: 0, minute: 0 }
  ytime = { hour: 0, minute: 0 };
  atime = { hour: 0, minute: 0 }
  btime = { hour: 0, minute: 0 };
  readOnly = false;
  xtrabreakTitle: any = '';
  constructor(private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTimings();
    this.getWeekTimings()
    // // console.log();

  }

  //  ---------------------------------Start-------------------------------------------
  // Function      : getTimings
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Manu Prasad 
  // Desc          : Get Timings from database

  getTimings() {
    this.companyService.getWorkTimes().subscribe(timings => {
      // console.log(timings);
      this.default = timings.default;
      this.breaks = timings.break
      let time = this.default.start_time.split(':');
      let etime = this.default.end_time.split(':');
      this.startTime = { hour: parseInt(time[0]), minute: parseInt(time[1]) }
      this.endTime = { hour: parseInt(etime[0]), minute: parseInt(etime[1]) }
      this.show = true;
      // // console.log(this.endTime);  
      // // console.log(this.startTime);  
    });

  }
  //  ---------------------------------end-----------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : getTimings
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Manu Prasad 
  // Desc          : Get Timings from database

  getWeekTimings() {
    this.companyService.getWeekTimes().subscribe(timings => {
      //  // console.log(timings)
      this.timings = timings;
      this.showTbl = true;
      //  // console.log(timings[1][0])
    });

  }
  //  ---------------------------------end-----------------------------------------------

  // checkType(val : any, x:any){
  //   if(val in this.timings || x in this.timings[x]){
  //     return true
  //   }
  //   else{
  //     return false
  //   }
  // }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
  //  ---------------------------------Start-------------------------------------------
  // Function      : setWorkTime
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Manu Prasad 
  // Desc          : set values to modal

  setWorkTime() {
    // $('#assignModal .modal-title').text("");
    $('#assignModal').modal('show');
  }
  //  ---------------------------------end-----------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : setWorkTime
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Manu Prasad 
  // Desc          : set values to modal

  saveWorkTime() {
    this.companyService.saveWorkTimes(this.default.id, this.startTime, this.endTime).subscribe(res => {
      if (res.status == 1) {
        let snackBarRef = this.snackBar.open(res.message, '', {
          duration: 2000
        });
        this.getTimings();
        $('#assignModal').modal('hide');
      }
      else {
        let snackBarRef = this.snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    });
  }
  //  ---------------------------------end-----------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : setRights
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Manu Prasad 
  // Desc          : set access rights in modal 
  deleteBreak(breakId) {
    this.BreakId = breakId;
    $('#deleteModal').modal('show');

  }
  //  ---------------------------------end-----------------------------------------------
  confirm() {
    this.companyService.deleteBreak(this.BreakId).subscribe(res => {
      let snackBarRef = this.snackBar.open(res.message, '', {
        duration: 2000
      });
      if (res.status == 1) {
        this.getTimings();
        $('#assignModal').modal('hide');

      }
    })
  }
  addBreak() {

    $('#breakModal').modal('show');
    this.breakStartTime = { hour: 0, minute: 0 };
    this.breakEndTime = { hour: 0, minute: 0 };
    this.breakTitle = '';
    //  this.breakStartTime.hour = 0 ;
    //  this.breakStartTime.minute =0 ;
    //  this.breakEndTime.hour =0 ;
    //  this.breakEndTime.minute =0 ;
  }
  saveBreak() {
    this.addBreakBtnDisable = true;
    this.addBreakSpinner = true;
    // console.log("hh")
    if (this.breakTitle == '' || this.breakTitle == undefined) {
      let snackBarRef = this.snackBar.open("Title empty!", '', {
        duration: 2000
      });
      this.addBreakBtnDisable = false;
      this.addBreakSpinner = false;
    }
    else {
      this.spinner = true;
      let data = {};
      data = {
        start_time: this.breakStartTime,
        end_time: this.breakEndTime,
        title: this.breakTitle,
        day: null,
        week: null
      }
      this.companyService.saveBreak(data).subscribe(res => {
        if (res.status == 1) {
          let snackBarRef = this.snackBar.open(res.message, '', {
            duration: 2000
          });
          this.addBreakBtnDisable = false;
          this.addBreakSpinner = false;
          this.getTimings();
          $('#breakModal').modal('hide');
          this.spinner = false;

        }
        else {
          let snackBarRef = this.snackBar.open(res.message, '', {
            duration: 2000
          });
          this.addBreakBtnDisable = false;
          this.addBreakSpinner = false;
          this.spinner = false;

        }
      });
    }
  }

  checkType(obj) {

    // // console.log( obj.length);
    if (obj.length > 0) {
      return false
    }
    else {
      return true
    }
  }

  openModal(day, week) {
    // console.log('day:'+day)
    // console.log('week:'+week)
    this.selectedWeek = week;
    this.selectedDay = day;
    this.getDayBreaks(day, week)
    this.getDayDetails(day, week);

  }
  getDayBreaks(day, week) {
    this.companyService.getDayBreaks(day, week).subscribe(res => {
      // console.log(res);
      this.dayBreak = res;
      // $('#weekModal').modal('show');

    });
  }
  getDayDetails(day, week) {
    this.companyService.getDayDetails(day, week).subscribe(res2 => {
      // console.log(res2)
      if (!res2[0].start_time) {
        this.holiday = true;
      }
      else {
        this.specificTime = res2[0];
        let time = res2[0].start_time.split(':');
        let etime = res2[0].end_time.split(':');
        this.xtime = { hour: parseInt(time[0]), minute: parseInt(time[1]) }
        this.ytime = { hour: parseInt(etime[0]), minute: parseInt(etime[1]) }
        this.xtime['hours'] =
          console.log(this.specificTime);
      }

      $('#weekModal').modal({ backdrop: 'static', keyboard: false })
      $('#weekModal').modal('show');

    });
  }
  addExtraBreak() {
    this.xtrabreakTitle = ''
    this.showAddBreak = true;
  }
  saveExtraBreak() {
    this.companyService.saveDayBreak(this.selectedDay, this.selectedWeek, this.atime, this.btime, this.xtrabreakTitle).subscribe(res2 => {
      if (res2.status == 1) {
        let snackBarRef = this.snackBar.open(res2.message, '', {
          duration: 2000
        });
        this.showAddBreak = false;
        this.getDayBreaks(this.selectedDay, this.selectedWeek);
      } else {
        let snackBarRef = this.snackBar.open(res2.message, '', {
          duration: 2000
        });
      }

    });
  }
  saveDayWorkTime() {
    this.editWorkinBtnDisable = true;
    this.editWorkingSpinner = true;

    console.log(this.holiday)

    this.companyService.saveDayWorkTime(this.holiday, this.xtime, this.ytime, this.selectedDay, this.selectedWeek).subscribe(res2 => {


      // // console.log(res2)
      if (res2.status == 1) {
        let snackBarRef = this.snackBar.open(res2.message, '', {
          duration: 2000
        });
        this.editWorkinBtnDisable = false;
        this.editWorkingSpinner = false;
        this.showAddBreak = false;
        this.holiday = false;
        this.getTimings();
        this.getWeekTimings();
        $('#weekModal').modal('hide');
      } else {
        let snackBarRef = this.snackBar.open(res2.message, '', {
          duration: 2000
        });
        this.editWorkinBtnDisable = false;
        this.editWorkingSpinner = false;
      }
    });
  }

  closeDayPopup() {
    this.showAddBreak = false;
    this.holiday = false;

    $('#weekModal').modal('hide');
  }
  closeExtraBreak() {
    this.showAddBreak = false;

  }
  deleteExtraBreak(breakId) {
    this.companyService.deleteExtraBreak(breakId).subscribe(res2 => {
      if (res2.status == 1) {
        let snackBarRef = this.snackBar.open(res2.message, '', {
          duration: 2000
        });
        this.showAddBreak = false;
        this.getDayBreaks(this.selectedDay, this.selectedWeek);
      } else {
        let snackBarRef = this.snackBar.open(res2.message, '', {
          duration: 2000
        });
      }

    });
  }

}
