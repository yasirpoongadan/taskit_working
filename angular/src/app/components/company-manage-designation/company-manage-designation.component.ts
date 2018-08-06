import { Component,ViewChild, OnInit,ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { CompanyService} from './../../services/company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-manage-designation',
  templateUrl: './company-manage-designation.component.html',
  styleUrls: ['./company-manage-designation.component.css']
})
export class CompanyManageDesignationComponent implements OnInit {
  displayedColumns = [ 'slno','name','action'];
  dataSource: MatTableDataSource<any>;
  notExist =false;
  id :any;
  name:any;
  all_value =false;
  showSpinner :boolean = false;

  designation = {designation_name : '',id:''}
  newDesignation :'';
    

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  
  // ---------------------------------Start-------------------------------------------
// Function      : project category master setting
// Params        : id
// Returns       : 
// Author        : sudha
// Date          : 12-03-2018
// Last Modified : 
// Desc          : All category
constructor(
  private companyService : CompanyService,
   private routes: Router,public snackBar: MatSnackBar) { }

  
         refresh(){
          // console.log("hj");
          this.showSpinner =true
          //  console.log(this.selected);
         // const company = [];
              this.companyService.getAlldesignations().subscribe(data=>{
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
    this.refresh();


  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addNewCategory(){
    //this.showSpinner =false;
    //this.showSpinnerDelete =false;
    this.newDesignation= '';
   }

     getId(id){
    // this.showSpinner =false
    // this.showSpinnerDelete =false
    this.id = id
   //  console.log(this.id)
  }
  
//delete Category
deleteDesignation(id){  
  this.showSpinner =true
    this.companyService.deleteDesignation(id).subscribe(data=>{
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

  addDesignation(newDesignation){
//console.log(newCategory);
  this.showSpinner =true;
 // console.log(newCategory);
    this.companyService.addDesignation(newDesignation).subscribe(designationData=>{
      if(!designationData.success){
        this.showSpinner =false
        let snackBarRef =  this.snackBar.open(designationData.msg, '', {
          duration: 2000
      });
        this.refresh();
    }
    else if(designationData.success){
      this.showSpinner =false
      let snackBarRef =  this.snackBar.open(designationData.msg, '', {
        duration: 2000
    });
    this.closeBtn.nativeElement.click();
    this.refresh(); 
    }

  });
 }

 getEditId(id){
  this.showSpinner =false;
    this.companyService.getSingledesignation(id).subscribe(data=>{
      console.log( data);
      this.designation = data;
      //this.id = data.id;
      if(data.success==false){
        let snackBarRef =  this.snackBar.open(data.msg, '', {
          duration: 2000
      });
        this.refresh();
    }
    else{
    }
    });
}

updateDesignation(designation){
//  console.log(category);
  this.showSpinner =true;
  this.companyService.updateDesignation(this.designation).subscribe(data=>{
    if(!data.success){
      this.showSpinner =false;
      let snackBarRef =  this.snackBar.open(data.msg, '', {
        duration: 2000
    });

  }
  else if(data.success){
    this.showSpinner =false;
    let snackBarRef =  this.snackBar.open(data.msg, '', {
      duration: 2000
  });
  this.closeBtn1.nativeElement.click();
  this.refresh();
 }
 });
}
// -----------------------------------End------------------------------------------

}
