import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-company-manage-holidays',
  templateUrl: './company-manage-holidays.component.html',
  styleUrls: ['./company-manage-holidays.component.css']
})
export class CompanyManageHolidaysComponent implements OnInit {
  displayedColumns = ['id', 'name', 'date', 'action'];
  dataSource: MatTableDataSource<any>;
  displatStat = false;
  themeId: string;
  showErr = false;
  existStatus: boolean = false;
  showSpinner: boolean = false;
  checkboxshow: Boolean = false
  addBtnDisable: Boolean = false;
  addSpinner: Boolean = false;
  editholiday: Boolean = false;
  editSpinner: Boolean = false;
  deleteBtnDisable: Boolean = false;
  deleteSpinner: Boolean = false;
  errMessage = '';
  spinner = false;
  selectedx: any;
  holidays: any;
  noYear = false;
  years: any;
  currentId: any;
  currentTitle: any;
  currentDate: any;
  newTitle: any;
  newDate: any;
  todayDate = new Date();
  holidayBtn: any;
  clickCheckbox: Boolean = false;
  gotoProjectPage: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.holidayBtn = 'Add Holiday'
    this.getYears();
    this.todayDate.setDate(this.todayDate.getDate() + 1)

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //  ---------------------------------Start-------------------------------------------
  // Function      : getHolidays
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 22-03-2018
  // Last Modified : 22-03-2018, Manu Prasad 
  // Desc          : Get Holidays from database

  getYears() {
    this.companyService.getYears().subscribe(years => {
      this.years = years;

      this.selectedx = years[1]
      // console.log(this.selectedx);
      this.noYear = true;
      this.getHolidays(this.selectedx);

    })
  }
  //  ---------------------------------end-----------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : getHolidays
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 22-03-2018
  // Last Modified : 22-03-2018, Manu Prasad 
  // Desc          : Get Holidays from database

  refresh() {
    this.getHolidays(this.selectedx);

  }
  //  ---------------------------------end-----------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : getHolidays
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 22-03-2018
  // Last Modified : 22-03-2018, Manu Prasad 
  // Desc          : Get Holidays from database
  getHolidays(year) {
    this.showSpinner = true
    this.companyService.getHoliday(this.selectedx).subscribe(holidays => {
      this.showSpinner = false
      // console.log(holidays.resp);  
      if (holidays.resp.length <= 0) {
        this.existStatus = true;
      }
      else {
        this.existStatus = false;
      }
      this.holidays = holidays;

      this.displatStat = true;
      this.dataSource = new MatTableDataSource(holidays.resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // }  
    });

  }
  //  ---------------------------------end-----------------------------------------------
  setEdit(id, title, date) {
    this.currentId = id;
    this.currentTitle = title;
    this.currentDate = date;
    $('#editModal').modal('show');

  }
  //  ---------------------------------Start-------------------------------------------
  // Function      : getHolidays
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 22-03-2018
  // Last Modified : 22-03-2018, Manu Prasad 
  // Desc          : Get Holidays from database

  //  ---------------------------------end-----------------------------------------------
  delItem(id) {
    this.currentId = id;
    $('#deleteModal').modal('show');

  }
  confirm() {
    this.deleteBtnDisable = true;
    this.deleteSpinner = true;
    this.companyService.deleteHoliday(this.currentId).subscribe(resUpdate => {
      this.deleteBtnDisable = false;
      this.deleteSpinner = false;
      // console.log(resUpdate);
      this.spinner = false
      let snackBarRef = this.snackBar.open(resUpdate.message, '', {
        duration: 2000
      });
      if (resUpdate.status == 1) {
        this.getHolidays(this.selectedx);

        $('#deleteModal').modal('hide');

      }

    });
  }
  editClose() {
    this.spinner = false
    $('#deleteModal').modal('hide');
  }

  addHoliday() {
    this.checkboxshow = false;
    $('#addModal').modal('show');

  }

  addClose() {
    $('#addModal').modal('hide');
    this.newTitle = '';
    this.newDate = '';
  }

  dateChanged() {
    this.clickCheckbox = false;
    this.gotoProjectPage = false;
    this.companyService.isProjectExist(this.newDate).subscribe(isProjectExist => {
      if (isProjectExist.success) {
        this.holidayBtn = 'Continue';
        this.gotoProjectPage = true;
        this.checkboxshow = true;
        // this.routes.navigate(['/revise-project']);
      } else {
        this.holidayBtn = 'Add Holiday';
        this.checkboxshow = false;
        this.clickCheckbox = true;

      }
    });
  }
  editDateChanged() {
    this.gotoProjectPage = false;
    this.clickCheckbox = false;
    this.companyService.isProjectExist(this.currentDate).subscribe(isProjectExist => {
      if (isProjectExist.success) {
        this.holidayBtn = 'Continue';
        this.gotoProjectPage = true;
        this.checkboxshow = true;
        // this.routes.navigate(['/revise-project']);
      } else {
        this.holidayBtn = 'Add Holiday';
        this.checkboxshow = false;
        this.clickCheckbox = true;
      }
    });
  }

  saveEdit() {
   
    let data = {
      title: this.currentTitle,
      id: this.currentId,
      date: this.currentDate
    }

    if (this.clickCheckbox == true) {
      this.companyService.updateHoliday(data).subscribe(resUpdate => {
        this.editholiday = false;
        this.editSpinner = false;
        // console.log(resUpdate);
        this.spinner = false
        let snackBarRef = this.snackBar.open(resUpdate.message, '', {
          duration: 2000
        });
        if (resUpdate.status == 1) {
          if (this.gotoProjectPage) {
            this.routes.navigate(['/revise-project/'+this.currentDate]);
     
          }
          this.getHolidays(this.selectedx);

          $('#editModal').modal('hide');
          this.companyService.isProjectExist(data.date).subscribe(isProjectExist => {
         
          });
        }
      });

    } else {
      let snackBarRef = this.snackBar.open('Please tick the check box for continue', '', {
        duration: 2000
      });
    }
  }

  saveHoliday() {
    if (this.clickCheckbox == true) {
      this.companyService.saveHoliday(this.newDate, this.newTitle).subscribe(resSave => {
        this.spinner = false
        let snackBarRef = this.snackBar.open(resSave.message, '', {
          duration: 2000
        });
        this.addBtnDisable = false;
        this.addSpinner = false;
        if (resSave.status == 1) {
          if (this.gotoProjectPage) {
            this.routes.navigate(['/revise-project/'+this.newDate ]);
          }
          this.getHolidays(this.selectedx);
          $('#addModal').modal('hide');
          this.newTitle = '';
          this.newDate = '';
        }
      });
    } else {
      let snackBarRef = this.snackBar.open('Please tick the check box for continue', '', {
        duration: 2000
      });
    }
  }

  checkPastDate(date) {
    // console.log(new Date(date));
    if (new Date(date) > new Date) {
      return true;
    }
    else {
      return false

    }
  }
}
