import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-edit-project',
  templateUrl: './company-edit-project.component.html',
  styleUrls: ['./company-edit-project.component.css']
})
export class CompanyEditProjectComponent implements OnInit {
  formGroup: any;
  sub: any;
  p_id: any;
  pm: any;
  entity: any;
  categories: any;
  showPMlist: Boolean = true;
  showRequirement: Boolean = false;
  pro1: any;
  project = {
    project_id: '',
    project_name: '',
    project_type: '',
    priority: '',
    description: '',
    pm_id: '',
    category_id: '',
    requirement_summary: '',
    docSrc: '',
    docFile: [],
  }

  constructor(private route: ActivatedRoute, public snackBar: MatSnackBar, private companyService: CompanyService, private routes: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.showRequirement = true;
    this.sub = this.route.params.subscribe(params => {
      this.p_id = params.id;
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
        if (this.entity.role_id == 3) {
          this.showPMlist = false;
        }
      });
      // -----------------------------------End------------------------------------------

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
        this.pro1 = res;
        // console.log(this.pro1.is_approved);
        if (this.pro1.is_approved == true || this.pro1.assignee_id != this.entity.id) {
          let snackBarRef = this.snackBar.open('Unauthorized Access', '', {
            duration: 4000
          });
          // this.routes.navigate(['/project']);
        }
        if (this.project.requirement_summary == '' || this.project.requirement_summary == null) {
          this.showRequirement = false;
        }
      });
      // ---------------------------------End-------------------------------------------
    });
    this.formGroup = this._formBuilder.group({
      project_nameValidation: ['', Validators.required],
      project_typeValidation: ['', Validators.required],
      priorityValidation: ['', Validators.required],
      descriptionValidation: ['', Validators.required],
      pm_idValidation: ['', Validators.required],
      category_idValidation: ['', Validators.required],
      reqValidation: ['', Validators.required],
    });

    // ---------------------------------Start-------------------------------------------
    // Function      : Get All pm, project category in a company
    // Params        : 
    // Returns       : All pm, project category in a company
    // Author        : Rinsha
    // Date          : 08-03-2018
    // Last Modified : 08-03-2018, Rinsha
    // Desc          :  
    this.companyService.getAllPm().subscribe(res => {
      this.pm = res;
    });
    this.companyService.getAllProjectCategory().subscribe(res => {
      this.categories = res;
    });
    // -----------------------------------End------------------------------------------
  }

  editProject(project) {
    this.project.project_id = this.p_id;
    // console.log(project);
    // ---------------------------------Start-------------------------------------------
    // Function      : edit project
    // Params        : data from form
    // Returns       : 
    // Author        : Rinsha
    // Date          : 09-03-2018
    // Last Modified : 09-03-2018, Rinsha
    // Desc          :  
    this.companyService.editProject(project).subscribe(data => {
      let snackBarRef = this.snackBar.open(data.msg, '', {
        duration: 4000
      });
      if (data.success == true) {
        this.routes.navigate(['/project']);
      }
    });
    // -----------------------------------End------------------------------------------
  }

  displayDoc(fileInput) {
    var ext = fileInput.target.files[0].name.split('.').pop().toLowerCase();
    this.project.docFile = fileInput.target.files[0];

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ((e) => {
        this.project.docSrc = e.target['result'];
      });

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
