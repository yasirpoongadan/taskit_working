import { Component,ViewChild, OnInit,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { CompanyService} from './../../services/company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'company-activity-log',
  templateUrl: './company-activity-log.component.html',
  styleUrls: ['./company-activity-log.component.css']
})
export class CompanyActivityLogComponent implements OnInit {
  displayedColumns = [ 'slno','user','date','time','action'];
  dataSource: MatTableDataSource<any>;
  notExist =false;
  selected = 'all';
 // all_value =false;
  // startDate:any='';
  // endDate:any='';
  endFrom :any = '';
  endUpto :any = '';
  users:any;
  showSpinner :boolean = false;

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

  private companyService : CompanyService,
   private routes: Router,public snackBar: MatSnackBar) { }


         refresh(){
          this.showSpinner =true
 
          let data={startDate: this.endFrom._d,endDate: this.endUpto._d,user_id:this.selected}
          console.log(data);

          this.companyService.getDatefilterforlog(data).subscribe(data=>{
         
             this.loadToDataTable(data);
             this.showSpinner =false 
           });
        }
 
        loadToDataTable(data){

          this.notExist =false;
          if(data.length == 0){
            this.notExist = true;
          }
          this.dataSource = new MatTableDataSource(data);
          // console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

  ngOnInit() {
  
    this.companyService.getAllusers().subscribe(res => {
      this.users = res;
     });

    this.refresh();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  

  public selectedStartDate(value: any, datepicker?: any) {
    this.endFrom =  value.start;
    this.endUpto =  value.end;
       let data={startDate: this.endFrom,endDate: this.endUpto,user_id:this.selected}
    this.companyService.getDatefilterforlog(data).subscribe(res=>{
    //  console.log(res);
      this.loadToDataTable(res);
   
   });
    
}










// -----------------------------------End------------------------------------------
}


