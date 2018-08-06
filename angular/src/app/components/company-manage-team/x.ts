import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import {Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-company-manage-team',
  templateUrl: './company-manage-team.component.html',
  styleUrls: ['./company-manage-team.component.css']
})
export class CompanyManageTeamComponent implements OnInit {

  displayedColumns = ['id','name', 'strength', 'status'];
  dataSource: MatTableDataSource<any>;
  displatStat = false;
  themeId: string;
  showErr = false;
  existStatus: boolean = false;
  showSpinner :boolean = false;
  members: any;
  teamMembers=[];
  heads=[];
  teamHead: any;
  teamId:any;
  selectedTeamMembers:any;
  errMessage = '';
  spinner = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTeams();
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

  getTeams(){
  this.showSpinner =true
  this.companyService.getTeams().subscribe(teams =>{
    this.showSpinner =false
      // console.log(teams);
    if(teams.length <= 0 ){
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
      this.displatStat = true;
      this.dataSource = new MatTableDataSource(teams);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
  // }  
  });

  }
//  ---------------------------------end-----------------------------------------------
 //  ---------------------------------Start-------------------------------------------
  // Function      : setTeam
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : set value in modal

  setTeam(teamId, teamName){
    // this.showSpinner =true
    this.teamId = teamId;
    this.companyService.getTeamMembers(teamId).subscribe(members =>{
      this.showSpinner =false
        console.log(members);
      if(members.length <= 0 ){
        // console.log("theme is empty");
        this.existStatus = true;
      }
      else{
        this.members = members[0];
        this.teamMembers = members[2];
        this.existStatus = false;
        this.heads = members[2];
        this.selectedTeamMembers = members[4];
        
        if( members[3] == null){
          this.teamHead = '';
        }else{
          this.teamHead = members[3].user_profile_id
        }
        console.log(this.teamHead);
      }
      //  else {
    
    // }  
    });
   $('#assignModal .modal-title').text("Assign Members");
   $('#team-nm').text(teamName);
          $('#assignModal').modal('show'); 
    }
  //  ---------------------------------end-----------------------------------------------
   //  ---------------------------------Start-------------------------------------------
  // Function      : setTeam
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : set value in modal

  assignTeam(){
    // console.log(this.teamMembers);
    // console.log(this.teamHead);
    // console.log(this.teamId);
    this.spinner = true;
    if(this.teamMembers.length == 0 || this.teamHead == ''){
      this.errMessage  = "Please select fields!";
    this.spinner = false;      
    }
    else{
      this.errMessage  = "";      
      this.companyService.assignTeam(this.teamMembers,this.teamHead,this.teamId).subscribe(res =>{
        if(res.status == 1){
          let snackBarRef = this.snackBar.open(res.Message, '', {
            duration: 2000
          });
          this.getTeams();
          this.spinner = false;                
          $('#assignModal').modal('toggle');
        }else{
          let snackBarRef = this.snackBar.open(res.Message, '', {
            duration: 2000
          });
        }
      })

    }
    }
  //  ---------------------------------end-----------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : setTeam
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : set value in modal

  memberSelect(member){
    console.log(member)
    if(member != ''){
      // this.heads = member;
      this.selectedTeamMembers = []
    member.forEach(element => {
      // console.log(element);
      this.members.forEach(ele => {
        // console.log(ele);
        if(element == ele.id){
          this.selectedTeamMembers.push(ele);
        }
      });
    });
    }
    // console.log(member);
    
    // console.log(this.teamMembers[this.teamMembers.length-1]);
    }
  //  ---------------------------------end-----------------------------------------------


  //  ---------------------------------Start-------------------------------------------
  // Function      : setTeam
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : set value in modal

  headSelect(head){
    if(head != ''){
      this.teamHead =head;
    }
    // console.log(head);
    // console.log(this.teamMembers[this.teamMembers.length-1]);
    }
  //  ---------------------------------end-----------------------------------------------
}