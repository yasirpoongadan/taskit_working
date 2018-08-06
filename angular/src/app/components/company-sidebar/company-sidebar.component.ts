import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import * as socketIo from 'socket.io-client';
declare var $: any;
import { Config } from './../../config/config';
@Component({
  selector: 'company-sidebar',
  templateUrl: './company-sidebar.component.html',
  styleUrls: ['./company-sidebar.component.css']
})
export class CompanySidebarComponent implements OnInit {
  private socket: any;
  role ;
  rights = []
  disp = true;
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar,
    private config: Config) {
      this.socket = socketIo(config.socketURL);  
   }
   ngOnInit(){

   }
  ngAfterViewInit() {
    this.checkRole(); 
    // ---------------------------------Start-------------------------------------------
    // Function      : Get logged in entity
    // Params        : 
    // Returns       : Get logged in entity
    // Author        : Rinsha
    // Date          : 08-03-2018
    // Last Modified : 08-03-2018, Rinsha
    // Desc          :  
    this.companyService.getLoggedinEntity().subscribe(data => {
      if(data == null || data == ''){
        this.routes.navigate(['/home']); 
      }
      if(data.role_id == 2){
        //super admin
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/home']); 
        }
        this.routes.navigate(['/admin-dashboard']);
      }
      if(data.role_id == 3 || data.role_id == 1){
        //company admin or pm
        if(data.delete_status == true || data.block_status == true || data.cmp_status == "Not Verified"){
          this.routes.navigate(['/company-login']); 
        }
        if(data.cmp_status == "Expired"){
          this.routes.navigate(['/expired']);
        }
        if(data.is_profile_completed == false){
          this.routes.navigate(['/compay-aditninfo', data.cmp_id]);
        }
        // this.routes.navigate(['/company-dashboard']);
      }
      if(data.role_id == 4){
        //user
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/company-login']); 
        }
        this.routes.navigate(['/user-dashboard']);
      }
    });
    // -----------------------------------End------------------------------------------
  }

  getAccessRightsforRole() {
    // ---------------------------------Start-------------------------------------------
    // Function      : getAccessRightsforRole
    // Params        : 
    // Returns       : Access rights based on role
    // Author        : Manu Prasad
    // Date          : 19-04-2018
    // Last Modified : 19-04-2018, Manu Prasad
    // Desc          : 
    this.companyService.getAccessRightsforRole().subscribe(res => {
      // console.log(res);
      this.rights = res;
      this.disp = true;
      // console.log(res);      
      // console.log("res");
    });
    // ---------------------------------End-------------------------------------------
  }
  checkRole() {
    // ---------------------------------Start-------------------------------------------
    // Function      : getAccessRightsforRole
    // Params        : 
    // Returns       : Access rights based on role
    // Author        : Manu Prasad
    // Date          : 19-04-2018
    // Last Modified : 19-04-2018, Manu Prasad
    // Desc          : 
    this.companyService.checkRole().subscribe(res => {
      // console.log(res);
      // console.log(res);      
      // console.log("res");
      this.role = res;
      if(res == 3){
        this.getAccessRightsforRole();

      }else{
      this.disp = true;
        
      }
      
    });
    // ---------------------------------End-------------------------------------------
  }
  exist(id){
    let x=false;
    // console.log('calling exist');
    if(this.role == 3){
      // console.log('passind id');
      // console.log(id)
      this.rights.forEach((element) => {
        // console.log('each id id');
          // console.log(element.access_rights_id)
        if(element.access_rights_id == id){
          x = true
          
        }
      });
    }
    // console.log(x);
    return x;

  }
  exist2(a,b,c,d){
    let arr = [a,b,c,d]
    // console.log("gsg")
    // console.log(this.rights);
    // console.log("gsg")
    
    let trust = false;
    if(this.role == 3){
      arr.forEach(ele=>{
        this.rights.forEach(element => {
          if(element.access_rights_id == ele){
            trust = true;
          }
        });
      })
    // console.log(trust);
    }
    else{
      return true
    }
   
    return trust
  }
}
