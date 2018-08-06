import { Component, OnInit } from '@angular/core';
import { AdminService} from './../../services/admin.service';
import { CompanyService } from '../../services/company.service';
import {Router} from '@angular/router';
import { Config } from './../../config/config';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.css']
})
export class AdminTopbarComponent implements OnInit {

  notif : any;
  count : any;
  private socket: any;
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    private adminService : AdminService,
    private router: Router,
    private config: Config
  ) {   this.socket = socketIo(config.siteUrl);}
// ---------------------------------Start-------------------------------------------
// Function      : Admin  management
// Params        : id
// Returns       : 
// Author        : sudha
// Date          : 06-03-2018 
// Last Modified : 
// Desc          : Adminnotification
refresh(){
      this.adminService.getAdminnotification().subscribe(data=>{ 
      this.notif = data;
      this.count = data.length;
       console.log(this.notif);
    });
    
}

  ngOnInit() {
    // ---------------------------------Start-------------------------------------------
    // Function      : Get logged in entity
    // Params        : 
    // Returns       : Get logged in entity
    // Author        : Rinsha
    // Date          : 20-04-2018
    // Last Modified : 20-04-2018, Rinsha
    // Desc          :  
    this.adminService.getLoggedinEntity().subscribe(data => {
      if(data == null || data == ''){
        this.routes.navigate(['/home']); 
      }
      if(data.role_id == 2){
        //super admin
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/home']); 
        }
        // this.routes.navigate(['/admin-dashboard']);
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
        this.routes.navigate(['/company-dashboard']);
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
    this.refresh();
    this.socket.on('new company', (data) => {
      
        this.refresh();
      
     });
  }
  // viewstatus admin
  viewstatus(id){ 
    console.log("asf"+id) ;
  this.adminService.viewstatusadmin(id).subscribe(data=>{
    //console.log(data);
    if(data.success){
      this.refresh();   
  
         }
         else{
         
        }
       
  });

}
logout() {
  this.companyService.logout();
  this.routes.navigate(['/home']);
  return false;
}
}
