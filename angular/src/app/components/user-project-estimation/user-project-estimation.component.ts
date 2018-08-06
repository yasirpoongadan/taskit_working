import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-project-estimation',
  templateUrl: './user-project-estimation.component.html',
  styleUrls: ['./user-project-estimation.component.css']
})
export class UserProjectEstimationComponent implements OnInit {
  estimateProject :Boolean = false;
  estimateSpinner :Boolean = false;
  filesToUpload: Array<File>;
  formGroup: any;
  private sub: any;
  time_for_estimation :any;
  project: any;
  pro_date: any;
  p_id: any;
  notif_id: any;
  teamhead: any[] = [];
  pm: any;
  pm_id: any;
  entity: any;
  team_members: any;
  team_member: any[] = [];
  categories: any;
  showPMlist: any;
  developerTeam: any;
  designerTeam: any;
  qcTeam: any;
  category: any;
  category_id: any;
  index: any;
  i: any;
  j: any;
  modules = [];
  isError: Boolean = false;
  estimated_hour: number = 0;
  team_id: any;
  module = {
    name: '',
    time: 0,
    tasks: [],
  };
  task = {
    name: '',
    planned_hour: 0,
    buffer_time: 0,
    verification_hour :0,
    description: '',
  }
  datafromForm = {
    project_id: '',
    team_id: '',
    modules: [],
    team_member: [],
    estimated_hour: 0,
    notif_id: '',
    time_for_estimation :0
  }
  selectedTask = {
    name: '',
    planned_hour: 0,
    buffer_time: 0,
    verification_hour :0,
    description: '',
  }
  show = [];
  disabled: Boolean = false;
  previousResubmittedEstimation: any;
  previousEstimations: any[] = [];
  team_name: any;
  task_time: any;
  selected = [];
  copyModules = [];
  copiedModules = [];
  labelToExpand: any;
  btnDisabled: boolean = false;
  reasonforReject: any;
  rejectReasonShow: Boolean = false;

  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  constructor(private userService: UserService, private route: ActivatedRoute,private router: Router, public snackBar: MatSnackBar, private companyService: CompanyService, private routes: Router, private _formBuilder: FormBuilder) {
     // override the route reuse strategy
     this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });
    this.filesToUpload = [];
  }

  ngOnInit() {
    console.log("ngoninit")
    this.labelToExpand = "View More";
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

      this.p_id = params['id1'];
      this.notif_id = params['id2'];
      // ---------------------------------Start-------------------------------------------
      // Function      : get notif by id
      // Params        : id
      // Returns       : notification
      // Author        : Rinsha
      // Date          : 14-03-2018
      // Last Modified : 14-03-2018, Rinsha
      // Desc          : check whether the logged in member is the suitable person to estimate
      this.userService.getNotif(this.notif_id).subscribe(notif => {
        if (notif.success == false) {
          let snackBarRef = this.snackBar.open(notif.msg, '', {
            duration: 2000
          });
          this.routes.navigate(['/user-dashboard']);
        }
      });
      // ---------------------------------End-------------------------------------------

      // ---------------------------------Start-------------------------------------------
      // Function      : getCurrentEstimation
      // Params        : notification id
      // Returns       : estimation
      // Author        : Rinsha
      // Date          : 15-03-2018
      // Last Modified : 15-03-2018, Rinsha
      // Desc          : get Current Estimation from notification id
      this.userService.getCurrentEstimation(this.notif_id).subscribe(est => {
        console.log(est)
        if (!est || est == [] || est == null || est == '' || est.data == null) {

        }
        else {
          if(est.data.time_tacken_for_estimation){
       
            this.time_for_estimation = est.data.time_tacken_for_estimation;
          }
          this.team_member = [];
          est.team_members.forEach(mbr => {
            this.team_member.push(mbr.user_profile_id);
          });

          this.rejectReasonShow = false;
          this.reasonforReject = "";
          // console.log(est);
          if (est.data !== null) {
            // then it is resubmitted estimation
            if (est.data.reason != '') {
              this.rejectReasonShow = true;
              this.reasonforReject = est.data.reason;
            }
            else {
              this.rejectReasonShow = false;
              this.reasonforReject = "";
            }
            this.modules = [];
            this.module = {
              name: '',
              time: 0,
              tasks: [],
            };
            this.task = {
              name: '',
              planned_hour: 0,
              buffer_time: 0,
              verification_hour :0,
              description: '',
            };
            this.estimated_hour = 0;
            est.data.tbl_estimation_modules.forEach(estimatedModule => {
              this.module.name = estimatedModule.module_name;
              this.module.tasks = [];
              estimatedModule.tbl_estimation_tasks.forEach(estimatedTask => {
                this.task = {
                  name: estimatedTask.task_name,
                  planned_hour: estimatedTask.planned_hour,
                  buffer_time: estimatedTask.buffer_hour,
                  verification_hour :estimatedTask.verification_hour,
                  description: estimatedTask.description,
                };

                this.module.tasks.push(this.task);
                this.module.time = this.module.time + this.task.planned_hour + this.task.buffer_time;
                this.estimated_hour = this.estimated_hour + this.task.planned_hour + this.task.buffer_time;
              });
              this.modules.push(this.module);
              // console.log(estimatedModule)
              this.module = {
                name: '',
                time: 0,
                tasks: [],
              };
              this.task = {
                name: '',
                planned_hour: 0,
                buffer_time: 0,
                verification_hour :0,
                description: '',
              };
            });
          }
          else {
            this.modules = [];
            this.estimated_hour = 0;
          }
        }

        // console.log(this.modules);
      });

      // ---------------------------------End-------------------------------------------

      // ---------------------------------Start-------------------------------------------
      // Function      : get project by id
      // Params        : id
      // Returns       : project
      // Author        : Rinsha
      // Date          : 08-03-2018
      // Last Modified : 08-03-2018, Rinsha
      // Desc          : getProject
      this.companyService.getProject(this.p_id).subscribe(res1 => {
        console.log("fffffff");
        this.project = [];
        this.project = res1;
        this.pro_date = this.project.createdAt.substring(0, 10);
        this.category_id = this.project.category_id;
        this.pm_id = this.project.pm_id;
        // ---------------------------------Start-------------------------------------------
        // Function      : get category by id
        // Params        : id
        // Returns       : category
        // Author        : Rinsha
        // Date          : 08-03-2018
        // Last Modified : 08-03-2018, Rinsha
        // Desc          : getCategoryById
        this.companyService.getCategoryById(this.category_id).subscribe(res2 => {
          this.category = res2;
        });
        // ---------------------------------End-------------------------------------------

        // ---------------------------------Start-------------------------------------------
        // Function      : get pm by id
        // Params        : login id
        // Returns       : user info
        // Author        : Rinsha
        // Date          : 13-03-2018
        // Last Modified : 13-03-2018, Rinsha
        // Desc          : getPmByLoginid
        this.userService.getPmByLoginid(this.pm_id).subscribe(res3 => {
          this.pm = res3;
        });
        // ---------------------------------End-------------------------------------------
      });
      // ---------------------------------End-------------------------------------------

      // ---------------------------------Start-------------------------------------------
      // Function      : getTeamMembers
      // Params        : login id, project id
      // Returns       : team members
      // Author        : Rinsha
      // Date          : 13-03-2018
      // Last Modified : 13-03-2018, Rinsha
      // Desc          :  Find user profile id of head from tbl_user_profie using login id. Then find the team id from tbl_estimation_teams using head id. Then team members from tbl_team_assocs. 
      this.userService.getTeamMembers(this.p_id).subscribe(data1 => {
        this.team_members = data1.slice(0, data1.length - 1);
        this.team_id = data1[data1.length - 1].team_id;
      });
      // -----------------------------------End------------------------------------------
      this.getPreviousEstimations();
    });

  }

  addModule() {
    // console.log(this.module.name);
    if (this.module.name == '') {
      let snackBarRef = this.snackBar.open("Module Name cannot be blank", '', {
        duration: 2000
      });
    }
    else {
      this.modules.push(this.module);
      this.module = {
        name: '',
        time: 0,
        tasks: [],
      };
    }
  }

  getId(index) {
    // console.log(index);
    this.index = index;
  }

  addTask(index) {
    // console.log(this.task);
    if (this.task.name == '' || this.task.planned_hour == 0 || this.task.description == '') {
      let snackBarRef = this.snackBar.open("All fields are required", '', {
        duration: 2000
      });
    }
    else {
      this.modules[index].tasks.push(this.task);
      this.modules[index].time = this.modules[index].time + this.task.planned_hour + this.task.buffer_time;
      this.estimated_hour = this.estimated_hour + this.task.planned_hour + this.task.buffer_time;
      // this.module_time = this.module_time + this.task.planned_hour + this.task.buffer_time;
      // console.log(index);
      // console.log("module time:"+this.modules[index].time);
      // console.log("estimated time:"+this.estimated_hour);
      this.task = {
        name: '',
        planned_hour: 0,
        buffer_time: 0,
        verification_hour :0,
        description: '',
      };
      this.closeBtn1.nativeElement.click();
    }
  }

  estimate() {
    console.log(this.time_for_estimation);
    this.estimateProject =true;
    this.estimateSpinner =true;
    this.btnDisabled = true;
    this.isError = false;
    // if (this.team_members && this.team_members.length != 0 && this.team_member.length == 0) {
    //   this.isError = true;
    //   let snackBarRef = this.snackBar.open("Please select members on your team!", '', {
    //     duration: 2000
    //   });
    //   this.estimateProject =false;
    //   this.estimateSpinner =false;
    //   this.btnDisabled = false;
    // }
    // else 
    if(this.time_for_estimation == 0 || this.time_for_estimation == undefined){
      let snackBarRef = this.snackBar.open("Time tacken for estimation is required!", '', {
        duration: 2000
      });
      this.estimateProject =false;
      this.estimateSpinner =false;
      this.btnDisabled = false;
    }
    else if (this.modules.length == 0) {
      this.isError = true;
      let snackBarRef = this.snackBar.open("Atleast one module is required!", '', {
        duration: 2000
      });
      this.estimateProject =false;
      this.estimateSpinner =false;
      this.btnDisabled = false;
    }
    else {
      this.modules.forEach(element => {
        if (element.tasks.length == 0) {
          this.isError = true;
          let snackBarRef = this.snackBar.open("Each module should contain atleast one task!", '', {
            duration: 3000
          });
          this.estimateProject =false;
          this.estimateSpinner =false;
          this.btnDisabled = false;
        }
      });
    }
  
    if (this.isError == false) {
      this.datafromForm = {
        project_id: this.p_id,
        team_id: this.team_id,
        modules: this.modules,
        team_member: this.team_member,
        estimated_hour: this.estimated_hour,
        notif_id: this.notif_id,
        time_for_estimation :this.time_for_estimation
      }
      // console.log(this.datafromForm);
      // ---------------------------------Start-------------------------------------------
      // Function      : add estimation
      // Params        : data from form
      // Returns       : 
      // Author        : Rinsha
      // Date          : 13-03-2018
      // Last Modified : 13-03-2018, Rinsha
      // Desc          :  
      this.userService.addEstimation(this.datafromForm).subscribe(data => {
        this.estimateProject =false;
        this.estimateSpinner =false;
        // console.log(data)
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 4000
        });
        if (data.success == true) {
          this.routes.navigate(['/user-dashboard']);
        }
      });
      // -----------------------------------End------------------------------------------
    }
  }

  deleteModule(i) {
    this.estimated_hour = this.estimated_hour - this.modules[i].time;
    this.modules.splice(i, 1);
  }

  getId1(i, j) {
    this.i = i;
    this.j = j;
    this.selectedTask = this.modules[i].tasks[j];
    this.modules[i].time = this.modules[i].time - this.modules[i].tasks[j].planned_hour - this.modules[i].tasks[j].buffer_time;
    this.estimated_hour = this.estimated_hour - this.modules[i].tasks[j].planned_hour - this.modules[i].tasks[j].buffer_time;
  }

  deleteTask(i, j) {
    this.modules[i].tasks.splice(j, 1);
  }

  editTask(i, j) {
    // console.log(this.modules[i].tasks[j]);
    if (this.selectedTask.name == '' || this.selectedTask.planned_hour == 0 || this.selectedTask.description == '') {
      let snackBarRef = this.snackBar.open("All fields are required", '', {
        duration: 2000
      });
    }
    else {
      this.modules[i].tasks[j] = this.selectedTask;
      this.modules[i].time = this.modules[i].time + this.selectedTask.planned_hour + this.selectedTask.buffer_time;
      this.estimated_hour = this.estimated_hour + this.selectedTask.planned_hour + this.selectedTask.buffer_time;
      this.closeBtn2.nativeElement.click();
    }
  }

  editModules(i) {
    this.show[i] = true;
    this.disabled = true;
  }

  editModule(i) {
    this.show[i] = false;
    this.disabled = false;
  }

  getPreviousEstimations() {

    // ---------------------------------Start-------------------------------------------
    // Function      : getProjectstimations
    // Params        : project id
    // Returns       : estimations
    // Author        : Rinsha
    // Date          : 15-03-2018
    // Last Modified : 15-03-2018, Rinsha
    // Desc          :
    this.companyService.getProjectstimations(this.p_id).subscribe(esti => {
    
      this.previousEstimations = [];
      this.previousEstimations = esti;

      this.previousEstimations.forEach(element => {
        if (element.tbl_project_estimation_team.team_id == 1) {
          this.team_name = "Developer";
        }
        else if (element.tbl_project_estimation_team.team_id == 2) {
          this.team_name = "Designer";
        }
        else if (element.tbl_project_estimation_team.team_id == 3) {
          this.team_name = "QC";
        }
        element.team_name = this.team_name;
        element.tbl_estimation_modules.forEach(modules => {
          this.task_time = 0;
          modules.tbl_estimation_tasks.forEach(tasks => {
            this.task_time = this.task_time + tasks.planned_hour + tasks.buffer_hour;
          });
          modules.module_time = this.task_time;
        });
      });
    });
    console.log( this.previousEstimations)
    // console.log(this.previousEstimations);
    // console.log("this")
  }

  copyModule() {
    // console.log(this.copyModules)
    this.copyModules.forEach((key, module_id) => {
      if (key == true) {
        // console.log("value:" + module_id)
        this.previousEstimations.forEach(est => {
          est.tbl_estimation_modules.forEach(module => {
            if (module.id == module_id) {
              this.module.time = 0;
              // this.estimated_hour = 0;
              this.copiedModules = module;
              this.module.name = module.module_name;
              module.tbl_estimation_tasks.forEach(task => {
                this.task = {
                  name: task.task_name,
                  planned_hour: task.planned_hour,
                  buffer_time: task.buffer_hour,
                  verification_hour :task.verification_hour,
                  description: task.description,
                }
                this.module.time = this.module.time + task.planned_hour + task.buffer_hour;
                // this.estimated_hour = this.estimated_hour + this.module.time;
                this.module.tasks.push(this.task);
                this.task = {
                  name: '',
                  planned_hour: 0,
                  buffer_time: 0,
                  verification_hour :0,
                  description: '',
                }
              });
              this.estimated_hour = this.estimated_hour + this.module.time;
              this.modules.push(this.module);
              let snackBarRef = this.snackBar.open("Copied", '', {
                duration: 2000
              });
              this.module = {
                name: '',
                time: 0,
                tasks: [],
              };
            }
          });
        });
      }
    });
    this.copyModules = [];
    // console.log(this.copiedModules);
  }

  expand() {
    if (this.labelToExpand == "View Less") {
      this.labelToExpand = "View More";
    }
    else {
      this.labelToExpand = "View Less";
    }
  }
  _keyPress(event: any) {
    const pattern = /[0-9/ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.charCode != 0) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
