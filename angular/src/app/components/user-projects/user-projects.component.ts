import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { UserService } from './../../services/user.service';
import {Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {

  spinner = false;
  projects:any;
  text = "&nbsp;&nbsp;";
  statusSelected = 'All';
  showData = false;
  showxData = false;
  projectSelect:any;
  noItems= false;
  ProjectSelected=''
  proSelector:any
  proCheckbox:any;
  constructor(
    private userService: UserService,
    private routes: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserProjects();
  }

  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Manu Prasad 
  // Desc          : Get Teams from database


  getUserProjects(){
  
    this.spinner = true;
    this.ProjectSelected = 'All';
    // console.log(this.ProjectSelected);
    this.userService.getUserProjects().subscribe(resProjects =>{
      console.log(resProjects);
      this.projects = resProjects;
      // if(resProjects[0].tbl_project_member_assocs.length>0){
      if(resProjects){
        if(resProjects.length>0){
          this.noItems = false;        
          this.showxData = true;  
          this.spinner = false;
          this.proSelector = resProjects;
          // this.proCheckbox = resProjects[0].tbl_project_member_assocs;
        }else{
          this.noItems = true;        
          this.showxData = true;  
          this.spinner = false;
        }
      }
      // console.log(resProjects)
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


  viewProject(id){
    // console.log("dsa");
    this.routes.navigate(['/user-view-project', id])
  
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


  setDate(date1){
    if(date1){
      let time = date1.split(':');
      // this.routes.navigate(['/user-view-project', id])
      // console.log(date)
      let xdate = time[0]
      let actualDate = xdate.split('T')
      return actualDate[0];
    }
    else{
      return '';
    }
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


  getProjects(){
    this.spinner = true;
    // this.showxData = false;  
    // console.log(this.statusSelected)
          
     if(this.statusSelected == 'All'){
      this.ProjectSelected = 'All';
      // console.log(this.ProjectSelected)
      this.getUserProjects();
       
     }   
     else{
      this.userService.getUserProjectsOnStatus(this.statusSelected).subscribe(resProjects =>{
        console.log(resProjects)
        if(resProjects.status == 0){
          this.noItems = true;
          
          this.projects = [];
          this.proSelector = [];                    
            // this.projects.push({tbl_project_member_assocs: []})
          // this.projects
          this.spinner = false;
             let snackBarRef = this.snackBar.open(resProjects.message, '', {
                duration: 2000
              });
        }else{
          this.noItems = false;
          // this.proSelector = resProjects[0].tbl_project_member_assocs;
          // this.proCheckbox = resProjects[0].tbl_project_member_assocs;
          this.projects = resProjects;
          this.proSelector = resProjects;          
          this.spinner = false;
  
        }
        
      });
     }
    
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


  getSelectedProjects(){
    this.spinner = true;
    // this.showxData = false;        
       
    if(this.ProjectSelected == 'All'){
      console.log(this.ProjectSelected)
      this.getUserProjectsonStatusandName();
         
       }else{
        this.userService.getUserProjectSelected(this.ProjectSelected).subscribe(resProjects =>{
          // console.log(resProjects)
          if(resProjects.status == 0){
            this.noItems = true;
            
            this.projects = [];
            this.projects.push({tbl_project_member_assocs: []})
            this.projects
            this.spinner = false;
               let snackBarRef = this.snackBar.open(resProjects.message, '', {
                  duration: 2000
                });
          }else{
  
            this.noItems = false;
          // this.proSelector = resProjects[0].tbl_project_member_assocs;
            
            this.projects = resProjects;
            this.spinner = false;
    
          }
          
        });
       }
      
     
    
    }
  //  ---------------------------------end-----------------------------------------------
  checkProject(pro1){
    // console.log(pro1)
    // console.log(pro2)
    let x=pro1.project_id;
    let y = 0;
    if(x != 0){
      y= pro1.project_id;
      console.log(x)
      console.log(y)
      if(x == y){
        return false;
      }
      else{
        return true;
      }
    }
    // if(x!=0 || y!=0){

    // }
  }
  getUserProjectsonStatusandName(){
    this.getProjects();
  }
}
