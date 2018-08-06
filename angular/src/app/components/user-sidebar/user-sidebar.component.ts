import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  isAssigned = false;
  constructor(private userService: UserService, private routes: Router,) { }

  ngOnInit() {
    // ---------------------------------Start-------------------------------------------
    // Function      : Get logged in entity
    // Params        : 
    // Returns       : Get logged in entity
    // Author        : Rinsha
    // Date          : 20-04-2018
    // Last Modified : 20-04-2018, Rinsha
    // Desc          :  
    this.userService.getLoggedinEntity().subscribe(data => {
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
        this.routes.navigate(['/company-dashboard']);
      }
      if(data.role_id == 4){
        //user
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/company-login']); 
        }
        // this.routes.navigate(['/user-dashboard']);
      }
      this.isTeamHeadForAnyTasks();
    });

  
    // -----------------------------------End------------------------------------------
  }
  isTeamHeadForAnyTasks(){
    this.userService.isTeamHeadForAnyTasks().subscribe(data => {
      this.isAssigned = data.isAssigned;
    });
  }

}
