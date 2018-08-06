import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import {Router} from '@angular/router';
import { Config } from './../../config/config';
import * as socketIo from 'socket.io-client';
// import async from 'async'; 
declare var $:any;
@Component({
  selector: 'app-company-manage-access-rights',
  templateUrl: './company-manage-access-rights.component.html',
  styleUrls: ['./company-manage-access-rights.component.css']
})
export class CompanyManageAccessRightsComponent implements OnInit {
  private socket: any;
  preloader :Boolean = false;
  displayedColumns = ['id','role',  'status'];
  dataSource: MatTableDataSource<any>;
  showErr = false;
  existStatus: boolean = false;
  showSpinner :boolean = false;
  accessRights: any;
  errMessage = '';
  spinner = false;
  userGroupId :any;
  addAccessBtnDisable :Boolean = false;
  AddAccessSpinner :Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private companyService: CompanyService,  private config: Config,
    private routes: Router,
    public snackBar: MatSnackBar) { this.socket = socketIo(config.siteUrl); }

  ngOnInit() {
    this.preloader =true;
    this.socket.on('expiredcompany', (data) => {
      this.routes.navigate(['/expired']);
        // this.refresh();
     });
    this.getUserGroups();
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
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Manu Prasad 
  // Desc          : Get Teams from database


  getUserGroups(){
    this.showSpinner =true
    this.companyService.getUserGroups().subscribe(userGroups =>{
      this.preloader = false;
      this.showSpinner =false
        // console.log(userGroups);
      if(userGroups.length <= 0 ){
        // console.log("theme is empty");
        this.existStatus = true;
      }
      else{
        this.existStatus = false;
      }
      //  else {
      // console.log(themes);
      // console.log("theme is not empty");
      //  console.log(this.existStatus);
        // this.displatStat = true;
        this.dataSource = new MatTableDataSource(userGroups);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
    // }  
    });
  
    }
  //  ---------------------------------end-----------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Manu Prasad 
  // Desc          : Get Teams from database

  getAccessRights(usergroupid){
    this.companyService.getAccessRights(usergroupid).subscribe(accessRights =>{
      this.accessRights = accessRights;
      // console.log(accessRights)
      
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

  setRights(usergroupid, usergroupName){
    this.getAccessRights(usergroupid);
    this.userGroupId = usergroupid
    $('#assignModal .modal-title').text("Assign Access Rights");
    $('#team-nm').text(usergroupName);
           $('#assignModal').modal('show'); 
  
    }
  //  ---------------------------------end-----------------------------------------------

  change(event){
    console.log(this.accessRights)
    let allChecked = true;
    // async.forEachOf(this.accessRights, (element, key, callback)=>{
      this.accessRights.forEach(element => {
      
        if(element.id == event){
          element.intermediate = true
          element.sub.forEach(ele => {
            // console.log(typeof ele.checked);
            if(ele.checked == false || typeof ele.checked == 'undefined'){
              // console.log("l");
              allChecked = false
              
            }
          });
          if(allChecked == true){
            element.checked = true
            element.intermediate = false;            
          }
          else{
            element.checked = false
            
          }
        }
      });
   
    }

  changeMaster(event){
    // console.log(event)
    this.accessRights.forEach(element => {

      if(element.id == event){
        if(element.checked == true){
          element.sub.forEach(ele => {
            ele.checked = true;
          });
        }
        else{
          element.sub.forEach(ele => {
            ele.checked = false;
          });
        }
        
      }
      // console.log(this.accessRights)
    });
    // conso
  }

  assignRights(){
    this.addAccessBtnDisable =true;
    this.AddAccessSpinner =true;
    this.spinner = true;
    this.companyService.assignRights(this.accessRights, this.userGroupId).subscribe(res =>{
      if(res.status == 1){
        
        let snackBarRef = this.snackBar.open(res.message, '', {
          duration: 2000
        });
        this.addAccessBtnDisable = false;
        this.AddAccessSpinner = false;
        // this.getAccessRights();
        this.spinner = false;                
        $('#assignModal').modal('toggle');
      }else{
        let snackBarRef = this.snackBar.open(res.message, '', {
          duration: 2000
        });
        this.addAccessBtnDisable= false;
        this.AddAccessSpinner = false;
      }
    })
  }

}