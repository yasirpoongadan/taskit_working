import { Component,ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AdminService} from './../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'admin-all-companies',
  templateUrl: './admin-all-companies.component.html',
  styleUrls: ['./admin-all-companies.component.css']
})
export class AdminAllCompaniesComponent implements OnInit {
  displayedColumns = [ 'slno','cmp_name','email','contactnumber','companystatus','status','action'];
  dataSource: MatTableDataSource<any>;
  notExist =false;
  id :any;
  selected = 'all';
  all_value =false;
  showSpinner :boolean = false;
  
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
  private adminService : AdminService,
   private routes: Router,public snackBar: MatSnackBar) { }

  
         refresh(){
          this.showSpinner =true
          //  console.log(this.selected);
          const company = [];
            if(this.selected == 'all'){
              this.adminService.getAllcompanies().subscribe(data=>{
                // console.log(data);
                if(data.length != 0){
                  this.all_value=true;
                }
                
                this.loadToDataTable(data);
                this.showSpinner =false 
              });
            }
            if(this.selected == 'Active'){
              this.adminService.getAllactivecompanies().subscribe(data=>{
                this.loadToDataTable(data);
                
                this.showSpinner =false
              });
            }
            if(this.selected == 'Block'){
              this.adminService.getAllblockedcompanies().subscribe(data=>{
                this.loadToDataTable(data);
                this.showSpinner =false
              });
            }
            if(this.selected == 'Delete'){
              this.adminService.getAlldeletedcompanies().subscribe(data=>{
                this.loadToDataTable(data);
                this.showSpinner =false
              });
            }
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
    this.refresh();
  }
  
  applyFilter(filterValue: string) {
    // console.log(filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
     getId(id){
    // this.showSpinner =false
    // this.showSpinnerDelete =false
    this.id = id
   //  console.log(this.id)
  }
//delete company
deleteCompany(id){  
  this.showSpinner =true
    this.adminService.deleteCompany(id).subscribe(data=>{
      // console.log(data);
      if(data.success){
        this.showSpinner =false
        let snackBarRef =  this.snackBar.open(data.msg, '', {
          duration: 2000
        });
        this.refresh();
           }
           else{
            this.showSpinner =false
            let snackBarRef =  this.snackBar.open(data.msg, '', {
              duration: 2000
            });
          }
          
    });

  }

//block company
blockCompany(id){  
  // console.log(id);
  this.adminService.blockCompany(id).subscribe(data=>{
    // console.log(data);
    if(data.success){
      let snackBarRef =  this.snackBar.open(data.msg, '', {
        duration: 2000
      });
      this.refresh();
    
    }else{
      let snackBarRef =  this.snackBar.open(data.msg, '', {
        duration: 2000
      });
     
    }
  });

}  
//unblock company
unblockCompany(id){
  this.adminService.unblockCompany(id).subscribe(data=>{
    // console.log(data);
    if(data.success){
      let snackBarRef =  this.snackBar.open(data.msg, '', {
        duration: 2000
      });
      this.refresh();
   
    }else{
      let snackBarRef =  this.snackBar.open(data.msg, '', {
        duration: 2000
      });
    }
  });

}
// -----------------------------------End------------------------------------------
}
