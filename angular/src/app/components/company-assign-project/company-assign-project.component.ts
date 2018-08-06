import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-assign-project',
  templateUrl: './company-assign-project.component.html',
  styleUrls: ['./company-assign-project.component.css']
})
export class CompanyAssignProjectComponent implements OnInit {
  assignProjectBtnDisable :Boolean = false;
  assignSpinner :Boolean = false;
  filesToUpload: Array<File>;
  formGroup: any;
  private sub: any;
  project: any;
  pro_date: any;
  p_id: any;
  teamhead: any[] = [];
  pm: any;
  entity: any;
  categories: any;
  showPMlist: any;
  developerTeam: any;
  allteam :any;
  designerTeam: any;
  qcTeam: any;
  category: any;
  category_id: any;
  project_assign = {
    teamhead: {id :''},
    project_id: '',
    developer_id: '',
    designer_id: '',
    qc_id: '',
    forward_to: '',
    requirement: '',
    docSrc: '',
    docFile: [],
    assigned_ids:[],
    assignedUsersTeamIdObj : {}
  };
  assignedUsersId = [];

  popElement: any;
  isExists: Boolean = false;
  constructor(private route: ActivatedRoute, public snackBar: MatSnackBar, private companyService: CompanyService, private routes: Router, private _formBuilder: FormBuilder) {
    this.filesToUpload = [];
  }

  ngOnInit() {
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
      // console.log(data);
    });
    // -----------------------------------End------------------------------------------

    this.sub = this.route.params.subscribe(params => {
      this.p_id = params.id;
      // ---------------------------------Start-------------------------------------------
      // Function      : get project by id
      // Params        : id
      // Returns       : project
      // Author        : Rinsha
      // Date          : 08-03-2018
      // Last Modified : 08-03-2018, Rinsha
      // Desc          : getProject
      this.companyService.getProject(this.p_id).subscribe(res => {
        this.project = res;
        if (this.project.requirement_summary != null || this.project.pm_id != this.entity.id) {
          let snackBarRef = this.snackBar.open('Unauthorized Access', '', {
            duration: 4000
          });
          this.routes.navigate(['/project']);
        }
        this.pro_date = this.project.createdAt.substring(0, 10);
        this.category_id = this.project.category_id;
        // ---------------------------------Start-------------------------------------------
        // Function      : get category by id
        // Params        : id
        // Returns       : category
        // Author        : Rinsha
        // Date          : 08-03-2018
        // Last Modified : 08-03-2018, Rinsha
        // Desc          : getCategoryById
        this.companyService.getCategoryById(this.category_id).subscribe(res => {
          this.category = res;
        });
        // ---------------------------------End-------------------------------------------
      });
      // ---------------------------------End-------------------------------------------

      // ---------------------------------Start-------------------------------------------
      // Function      : get developer team
      // Params        : 
      // Returns       : users in developer team
      // Author        : Rinsha
      // Date          : 09-03-2018
      // Last Modified : 09-03-2018, Rinsha
      // Desc          : getDeveloperTeam
      this.companyService.getDeveloperTeam().subscribe(res => {
        this.developerTeam = res;
      });

      this.companyService.getallTeamsforassign().subscribe(res => {
        this.allteam = res;
        console.log(this.allteam)
      });
      // ---------------------------------End-------------------------------------------

      // ---------------------------------Start-------------------------------------------
      // Function      : get designer team
      // Params        : 
      // Returns       : users in designer team
      // Author        : Rinsha
      // Date          : 09-03-2018
      // Last Modified : 09-03-2018, Rinsha
      // Desc          : getDesignerTeam
      this.companyService.getDesignerTeam().subscribe(res => {
        this.designerTeam = res;
      });
      // ---------------------------------End-------------------------------------------

      // ---------------------------------Start-------------------------------------------
      // Function      : get qc team
      // Params        : 
      // Returns       : users in qc team
      // Author        : Rinsha
      // Date          : 09-03-2018
      // Last Modified : 09-03-2018, Rinsha
      // Desc          : getQCTeam
      this.companyService.getQCTeam().subscribe(res => {
        this.qcTeam = res;
      });
      // ---------------------------------End-------------------------------------------
    });

    this.formGroup = this._formBuilder.group({
      developerValidation: ['', Validators.required],
      designerValidation: ['', Validators.required],
      qcValidation: ['', Validators.required],
      forwardValidation: ['', Validators.required],
      reqValidation: ['', Validators.required],
    });
  }

  // changeQC(qc) {
  //   this.popElement = '';
  //   this.isExists = false;
  //   this.teamhead.forEach((element, key) => {
  //     if (element.tbl_team_assocs[0].team_id == 3) {
  //       this.isExists = true;
  //       this.popElement = key;
  //     }
  //   });
  //   if (this.isExists == true) {
  //     this.teamhead.splice(this.popElement, 1);
  //   }
  //   if (this.inArray(qc, this.teamhead) == true) {
  //     this.project_assign.qc_id ='';
  //     let snackBarRef = this.snackBar.open("Team heads should be different", '', {
  //       duration: 2000
  //     });
  //   }
  //   else if (qc != '') {
  //     this.teamhead.push(qc);
  //   }
  // }

  changeTeam(teamm) {
     console.log(teamm);
    console.log( this.assignedUsersId);
    console.log( this.project_assign.assignedUsersTeamIdObj);

    if(this.project_assign.assigned_ids[teamm.id]){
          if (this.inArray(this.project_assign.assigned_ids[teamm.id].tbl_user_profile.id, this.assignedUsersId) == true) {  
            //console.log(this.project_assign.assigned_ids[teamm.id]);
            // this.project_assign.assigned_ids[teamm.id] = '';
           // console.log(this.project_assign.assigned_ids[teamm.id]);
          // if (index > -1) {
          //   this.project_assign.assigned_ids.splice(index, 1);
          // }
          // let snackBarRef = this.snackBar.open("Team heads should be different", '', {
          //   duration: 2000
          // });
        } else if (teamm != '') {
          console.log('vishuttan');
          this.teamhead.push(this.project_assign.assigned_ids[teamm.id].tbl_user_profile);
          this.project_assign.assignedUsersTeamIdObj[teamm.id] = this.project_assign.assigned_ids[teamm.id].tbl_user_profile.id;
          this.assignedUsersId.push(this.project_assign.assigned_ids[teamm.id].tbl_user_profile.id);
        }
    }else{
      var index = this.assignedUsersId.indexOf(this.project_assign.assignedUsersTeamIdObj[teamm.id]);
      if (index > -1) {
        this.assignedUsersId.splice(index, 1);
        this.project_assign.assignedUsersTeamIdObj[teamm.id]  = 0;
      }
    }
  }

  // changeDesigner(designer) {
  //   this.popElement = '';
  //   this.isExists = false;
  //   this.teamhead.forEach((element, key) => {
  //     if (element.tbl_team_assocs[0].team_id == 2) {
  //       this.isExists = true;
  //       this.popElement = key;
  //     }
  //   });
  //   if (this.isExists == true) {
  //     this.teamhead.splice(this.popElement, 1);
  //   }
  //   if (this.userExists(designer.id) == true) {
  //     this.project_assign.designer_id ='';
  //     let snackBarRef = this.snackBar.open("Team heads should be different", '', {
  //       duration: 2000
  //     });
  //   }


  //   else if (designer != '') {
  //     this.teamhead.push(designer);
  //   }
  // }

  assignProject(project) {
    // this.assignProjectBtnDisable =true;
    // this.assignSpinner =true;
    this.project_assign.project_id = this.p_id;
    // console.log(project);
    // ---------------------------------Start-------------------------------------------
    // Function      : assign project
    // Params        : form data
    // Returns       : 
    // Author        : Rinsha
    // Date          : 09-03-2018
    // Last Modified : 09-03-2018, Rinsha
    // Desc          : AssignTeamHead
    this.companyService.AssignTeamHead(project).subscribe(data => {
      this.assignProjectBtnDisable =false;
      this.assignSpinner =false;
      let snackBarRef = this.snackBar.open(data.msg, '', {
        duration: 4000
      });
      if (data.success == true) {
        this.routes.navigate(['/project']);
      }
    });
    // ---------------------------------End-------------------------------------------
  }

  displayDoc(fileInput) {
    var ext = fileInput.target.files[0].name.split('.').pop().toLowerCase();
    this.project_assign.docFile = fileInput.target.files[0];

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ((e) => {
        this.project_assign.docSrc = e.target['result'];
      });

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  inArray(needle, haystack) {
    var count = haystack.length;
    for (var i = 0; i < count; i++) {
      if (haystack[i] === needle) { return true; }
    }
    return false;
  }

  userExists(id) {
    return this.teamhead.some(function (el) {
      return el.id === id;
    });
  }


}
