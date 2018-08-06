import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-approve-project',
  templateUrl: './company-approve-project.component.html',
  styleUrls: ['./company-approve-project.component.css']
})
export class CompanyApproveProjectComponent implements OnInit {
  approveProject :Boolean = false;
  approveBtnspinner :Boolean = false; 
  rejectBtnDisable :Boolean = false;

  entity: any;
  private sub: any;
  project: any;
  project_submit: any;
  pro_date: any;
  p_id: any;
  pm_id: any;
  assignee_id: any;
  resubmitBtn : any;
  pm: any;
  estimation_hour: number = 0;
  team_leaders = [];
  team_name: any;
  project_cost: number = 0;

  constructor(private userService: UserService, private route: ActivatedRoute, public snackBar: MatSnackBar, private companyService: CompanyService, private routes: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    // console.log(this.disabled)
    // ---------------------------------Start-------------------------------------------
    // Function      : Get logged in entity
    // Params        : 
    // Returns       : Get logged in entity
    // Author        : Rinsha
    // Date          : 08-03-2018
    // Last Modified : 08-03-2018, Rinsha
    // Desc          :  
    this.companyService.getLoggedinEntity().subscribe(data => {
      this.entity = data;
    });
    // -----------------------------------End------------------------------------------

    this.sub = this.route.params.subscribe(params => {
      this.p_id = params['id'];

      // ---------------------------------Start-------------------------------------------
      // Function      : get project by id
      // Params        : id
      // Returns       : project
      // Author        : Rinsha
      // Date          : 08-03-2018
      // Last Modified : 08-03-2018, Rinsha
      // Desc          : getProject
      this.companyService.getProject(this.p_id).subscribe(res1 => {
        this.project = res1;
        this.pro_date = this.project.createdAt.substring(0, 10);
        this.pm_id = this.project.pm_id;
        this.assignee_id = this.project.assignee_id;
        if (this.assignee_id == this.pm_id) {
          this.resubmitBtn = "Edit Estimation";
        }
        else {
          this.resubmitBtn = "Resubmit";
        }
        if (this.project.status != "Drafted" || this.project.assignee_id != this.entity.id) {
          let snackBarRef = this.snackBar.open('Unauthorized Access', '', {
            duration: 4000
          });
          this.routes.navigate(['/project']);
        }

        // ---------------------------------Start-------------------------------------------
        // Function      : get pm by id
        // Params        : login id
        // Returns       : user info
        // Author        : Rinsha
        // Date          : 13-03-2018
        // Last Modified : 13-03-2018, Rinsha
        // Desc          : getPmByLoginid
        this.userService.getPmByLoginid(this.pm_id).subscribe(res => {
          this.pm = res;
        });
        // ---------------------------------End-------------------------------------------
      });
      // ---------------------------------End-------------------------------------------

      // ---------------------------------Start-------------------------------------------
      // Function      : getProjectstimations
      // Params        : project id
      // Returns       : estimations
      // Author        : Rinsha
      // Date          : 15-03-2018
      // Last Modified : 15-03-2018, Rinsha
      // Desc          :
      this.companyService.getProjectstimations(this.p_id).subscribe(data1 => {
        this.estimation_hour = 0;
        this.team_leaders = [];
        data1.forEach(element => {
          this.estimation_hour = this.estimation_hour + element.estimation_hour;
          if (element.tbl_project_estimation_team.team_id == 1) {
            this.team_name = "Developer";
          }
          else if (element.tbl_project_estimation_team.team_id == 2) {
            this.team_name = "Designer";
          }
          else if (element.tbl_project_estimation_team.team_id == 3) {
            this.team_name = "QC";
          }
          this.team_leaders.push(this.team_name + " Team head :" + element.tbl_project_estimation_team.tbl_user_profile.f_name + " " + element.tbl_project_estimation_team.tbl_user_profile.l_name)
        });
      });
      // ---------------------------------End-------------------------------------------
    });
  }

  acceptProject(project_cost) {
    this.approveProject =true;
    this.approveBtnspinner =true;
    this.project_cost = project_cost;
    if (this.project_cost == 0) {
      let snackBarRef = this.snackBar.open('Project Cost is required', '', {
        duration: 4000
      });
      this.approveProject =false;
      this.approveBtnspinner =false;
    }
    else {
      this.project_submit = {
        project_cost: this.project_cost,
        p_id: this.p_id,
        estimation_hour: this.estimation_hour,
        pm_id : this.pm_id
      }
      // ---------------------------------Start-------------------------------------------
      // Function      : accept project
      // Params        : cost, estimated hr, project id, pm id
      // Returns       : 
      // Author        : Rinsha
      // Date          : 20-03-2018
      // Last Modified : 20-03-2018, Rinsha
      // Desc          : acceptProject
      this.companyService.acceptProject(this.project_submit).subscribe(pro => {
        let snackBarRef = this.snackBar.open(pro.msg, '', {
          duration: 4000
        });
        this.approveProject =false;
        this.approveBtnspinner =false;
        if (pro.success == true) {
          if(this.pm_id == this.entity.id){
            this.routes.navigate(['/project-planning', this.p_id]);
          }
          else{
            this.routes.navigate(['/project']);
          }
        }
      });
      // ---------------------------------End-------------------------------------------
    }
  }

  rejectProject(project_cost) {
    this.rejectBtnDisable = true;
    this.approveBtnspinner =true;
    this.project_cost = project_cost;
    if (this.project_cost == 0) {
      let snackBarRef = this.snackBar.open('Project Cost is required', '', {
        duration: 4000
      });
      this.rejectBtnDisable = false;
      this.approveBtnspinner =false;
    }
    else {
      this.project_submit = {
        project_cost: this.project_cost,
        p_id: this.p_id,
        estimation_hour: this.estimation_hour,
        pm_id : this.pm_id
      }
      // ---------------------------------Start-------------------------------------------
      // Function      : reject project
      // Params        : cost, estimated hr, project id
      // Returns       : 
      // Author        : Rinsha
      // Date          : 20-03-2018
      // Last Modified : 20-03-2018, Rinsha
      // Desc          : rejectProject
      this.companyService.rejectProject(this.project_submit).subscribe(pro => {
        let snackBarRef = this.snackBar.open(pro.msg, '', {
          duration: 4000
        });
        this.rejectBtnDisable = false;
        if (pro.success == true) {
          this.routes.navigate(['/project']);
        }
      });
      // ---------------------------------End-------------------------------------------
    }
  }

  getCost(project_cost){
    this.project_cost = project_cost;
  }

  resubmitProject(project_cost) {
    if (this.project_cost == 0) {
      let snackBarRef = this.snackBar.open('Project Cost is required', '', {
        duration: 4000
      });
    }
    else {
      this.project_submit = {
        p_id: this.p_id,
        pm_id : this.pm_id
      }
      // ---------------------------------Start-------------------------------------------
      // Function      : resubmit project
      // Params        : cost, estimated hr, project id, pm id
      // Returns       : 
      // Author        : Rinsha
      // Date          : 20-03-2018
      // Last Modified : 20-03-2018, Rinsha
      // Desc          : resubmitProject
      this.companyService.resubmitProject(this.project_submit).subscribe(pro => {
        let snackBarRef = this.snackBar.open(pro.msg, '', {
          duration: 4000
        });
        if (pro.success == true) {
          if(this.pm_id == this.entity.id){
            this.routes.navigate(['/approve-estimation', this.p_id]);
          }
          else{
            this.routes.navigate(['/project']);
          }
        }
      });
      // ---------------------------------End-------------------------------------------
    }
  }

}
