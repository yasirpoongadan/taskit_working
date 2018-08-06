import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import {Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-company-task-requests',
  templateUrl: './company-task-requests.component.html',
  styleUrls: ['./company-task-requests.component.css']
})
export class CompanyTaskRequestsComponent implements OnInit {
  // displayedColumns = ['id', 'profile', 'name', 'task name', 'strength', 'reqstatus','status'];
  displayedColumns = ['slno', 'user_name', 'name', 'task name', 'reqstatus','status'];
  dataSource: MatTableDataSource<any>;
  showSpinner :boolean = false;
  existStatus: boolean = false;
  displatStat = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getNewTaskRequests()
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : Get Teams from database


  getNewTaskRequests(){
    this.showSpinner =true
    this.companyService.getNewTaskRequests().subscribe(requests =>{
      this.showSpinner =false
        // console.log(requests);
      if(requests.length <= 0 ){
        // // console.log("theme is empty");
        this.existStatus = true;
      }
      else{
        this.existStatus = false;
      }
      //  else {
      // // console.log(themes);
      // // console.log("theme is not empty");
      //  // console.log(this.existStatus);
        this.displatStat = true;
        this.dataSource = new MatTableDataSource(requests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
    // }  
    });
  
    }
  //  ---------------------------------end-----------------------------------------------

  profilCheck(image) {
    // ---------------------------------Start-------------------------------------------
    // Function      : Check image is empty
    // Params        : image name
    // Returns       : 
    // Author        : MANU PRASAD
    // Date          : 03-04-2018
    // Last Modified : 03-04-2018,
    // Desc          : check image is empty or not
    // // console.log('xx-'+image)
   if(image == ''){
     return false
   }else{
     return true
   }
    // ---------------------------------End-------------------------------------------
  }
}
