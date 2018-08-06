import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-company-new-task-management',
  templateUrl: './company-new-task-management.component.html',
  styleUrls: ['./company-new-task-management.component.css']
})
export class CompanyNewTaskManagementComponent implements OnInit {

  showSpinner = false;
  existStatus = true;
  id: any;
  taskRequest: any;
  projectDetails: any;
  totalHours: number;
  complexitys: any;
  paramsId: any;
  newTasks = {
    task_name: '',
    assigned_person: '',
    complexity: 0,
    planned_hour: 0,
    buffer_hour: 0,
    start_date: '',
    start_time: {},
    end_date: '',
    end_time: {},
    task_type: '',
    priority: '',
    assigned: '',
    assigned1: '',
    module_id: '',
    docFile: [],
    docSrc: '',
    file: '',
    team: '',
    time: 0,
    description: '',
    timerequired: '',
    newChecklist: [{ name: '' }],
    status: '',
    tbl_complexity_percentage: { percentage: '' },
    // team_id:0,
    req_id: 0,
    p_start: '',
    p_end: '',
    p_id: 0
  }
  data = {}
  role: any;
  lastTask: any;
  task: any;
  projectId: any;
  lastDate: any;
  lastTime: any;
  requestdetails:any;
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramsId = params['id'];

      // //console.log(this.surveyId + "surveyid");
    });
    // //console.log("hd")
    this.checkRole();
    this.companyService.getComplexity().subscribe(complexity => {
      this.complexitys = complexity;
      // //console.log(this.complexitys)
    });
    this.getNewTaskRequests();
  }
  checkRole() {
    this.companyService.checkRole().subscribe(role => {
      // //console.log(role);
      this.role = role
    });
  }
  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : Get Teams from database

  getNewTaskRequests() {
    this.showSpinner = true;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // //console.log(this.surveyId + "surveyid");
    });
    this.companyService.getNewTaskRequest(this.id).subscribe(requests => {
      this.requestdetails = requests;
        console.log(requests);
      this.showSpinner = false
      if (requests != null) {
        if (requests.length <= 0) {
          this.existStatus = true;
        }
        else {
          this.newTasks.req_id = requests.id;
          this.taskRequest = requests;
          this.projectId = requests.tbl_project_module.project_id;
          // //console.log(this.projectId)
          this.companyService.getProjectDetails(this.projectId).subscribe(projectDetails => {
            // //console.log(projectDetails)
            this.projectDetails = projectDetails.data;
            this.totalHours = projectDetails.hours;
            this.existStatus = false;
            this.getLastTaskDetails();
          })

        }
      }

      if (requests.status == 0) {
        let snackBarRef = this.snackBar.open(requests.message, '', {
          duration: 2000
        });
      }
      //  else {
      // //console.log(requests);
      // //console.log("theme is not empty");
      //  //console.log(this.existStatus);
      // }  
    });

  }
  //  ---------------------------------end-----------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : Get Teams from database

  getHours(tasks: any) {
    let time = 0;
    tasks.forEach(element => {
      time = time + element.planned_hour + element.buffer_hour
    });
    return time
  }
  //  ---------------------------------end-----------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Manu Prasad 
  // Desc          : Get Teams from database

  setEdit(id) {
    this.newTasks.task_name = this.taskRequest.task_name;
    this.newTasks.complexity = this.taskRequest.complexity_id;
    this.newTasks.planned_hour = this.taskRequest.planned_hours;
    this.newTasks.buffer_hour = this.taskRequest.buffer_hours;
    this.newTasks.module_id = this.taskRequest.tbl_project_module.id;
    this.newTasks.description = this.taskRequest.description;
    this.newTasks.assigned_person = this.taskRequest.tbl_user_profile.id;
    // if(this.taskRequest.team_id != null || this.taskRequest.team_id != 'null'){
    //   this.newTasks.team_id = this.taskRequest.team_id;

    // }
    // let date = this.taskRequest.planned_start_date.split('T');
    // this.newTasks.start_date = date[0];
    // let time = date[1].split(':');
    // this.newTasks.start_time = {hour:parseInt(time[0]), minute: parseInt(time[1])};
    this.newTasks.start_time = { hour: 0, minute: 0 };
    // //console.log(this.newTasks.start_time)
    // this.newTasks.start_date = date[0];
    // date = this.taskRequest.planned_end_date.split('T');
    // this.newTasks.end_date = date[0];
    // time = date[1].split(':');
    // this.newTasks.end_time = {hour:parseInt(time[0]), minute: parseInt(time[1])};
    this.newTasks.end_time = { hour: 0, minute: 0 };
  }
  //  ---------------------------------end-----------------------------------------------

  closeChecklist(index) {
    if (this.newTasks.newChecklist.length > 1) {
      this.newTasks.newChecklist.splice(index, 1);
    } else {
      let snackBarRef = this.snackBar.open('* Atleast one item required!', '', {
        duration: 2000
      });
      return false;
    }
  }
  addMore() {
    this.newTasks.newChecklist.push({ name: '' });
  }

  displayDoc(fileInput) {
    var ext = fileInput.target.files[0].name.split('.').pop().toLowerCase();
    this.newTasks.docFile = fileInput.target.files[0];
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((e) => {
        this.newTasks.docSrc = e.target['result'];
      });
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  submit() {
    this.newTasks.p_id = this.paramsId
    this.companyService.editTask(this.newTasks).subscribe(res8 => {
      if (res8.success) {
        let snackBarRef = this.snackBar.open(res8.msg, '', {
          duration: 2000
        });
        res8.data.forEach(element => {
          this.taskRequest.complexity_id = element.complexity_id;
          this.taskRequest.planned_hours = element.planned_hours;
          this.taskRequest.buffer_hours = element.buffer_hours;
          this.taskRequest.description = element.description;
          this.taskRequest.priority = element.priority;
          this.taskRequest.task_name = element.task_name;
          this.getNewTaskRequests();
        });

        $('#editModal').modal('hide');

      } else {
        let snackBarRef = this.snackBar.open(res8.msg, '', {
          duration: 2000
        });
      }

    });
    //console.log(this.newTasks);


  }
  closeModal() {
    this.newTasks.task_type = '';
    this.newTasks.priority = '';
    this.newTasks.newChecklist = [{ name: '' }];
  }
  approve() {
    this.newTasks.task_name = this.taskRequest.task_name;
    this.newTasks.complexity = this.taskRequest.complexity_id;
    this.newTasks.planned_hour = this.taskRequest.planned_hours;
    this.newTasks.buffer_hour = this.taskRequest.buffer_hours;
    this.newTasks.module_id = this.taskRequest.tbl_project_module.id;
    this.newTasks.description = this.taskRequest.description;
    this.newTasks.assigned_person = this.taskRequest.tbl_user_profile.id;
    // //console.log(this.newTasks);
    // var zero = 0;
    // var end_date_time = this.newTasks.end_date.setHours(end_time.hour,end_time.minute,zero);
    // var start_date_time = this.newTasks.start_date.setHours(start_time.hour,start_time.minute,zero);
    this.taskRequest.assigned_person = {};
    this.taskRequest.assigned_person.id = this.taskRequest.assigned_to_id;
    this.taskRequest.planned_hour = this.taskRequest.planned_hours;
    this.taskRequest.buffer_hour = this.taskRequest.buffer_hours;
    this.taskRequest.tbl_user_profile.start_date = this.lastDate;
    let t = this.lastTime.split(':')
    this.taskRequest.tbl_user_profile.start_time = { hour: t[0], minute: t[1], second: t[2] };

    // let tbl_estimation_tasks = {tbl_estimation_tasks:[this.taskRequest]}
    // let module =[] 
    this.task = { modules: [{ tbl_estimation_tasks: [this.taskRequest] }], teamMembers: [this.taskRequest.tbl_user_profile] }
    // let tbl_estimation_tasks = {tbl_estimation_tasks:[]}
    // this.task.modules[0].tbl_estimation_tasks[0]= this.taskRequest;
    // this.task.modules[0].tbl_estimation_tasks[0].assigned_person = {id:this.taskRequest.assigned_to_id};

    // this.task.teamMembers[0].start_date = [this.lastDate];
    // let t = this.lastTime.split(':')
    // this.task.teamMembers[0].start_time = {hour: t[0], minute: t[1], second: t[2]};
    // //console.log(this.task)

    this.companyService.getUserleavedataplanning(this.task).subscribe(data => {
      // //console.log(data)
      let Indexx = 0;
      data.data.forEach(element => {
        element.tbl_estimation_tasks.forEach((elm_tasks, key1) => {
          // let mdinx = this.tmp[Indexx].modIdnx;
          // let tskinx = this.tmp[Indexx].keyIdnx;
          this.newTasks.p_start = elm_tasks.start_date_time_new;
          this.newTasks.p_end = elm_tasks.end_date_time;
        })
      })
      // //console.log(this.task)
      this.companyService.approveTask(this.newTasks).subscribe(res => {
        // //console.log(res);
        if (res.success == false) {
          let snackBarRef = this.snackBar.open(res.msg, '', {
            duration: 2000
          });
        }
        if (res.success == true) {
          let snackBarRef = this.snackBar.open(res.msg, '', {
            duration: 2000
          });
          this.getNewTaskRequests()
          this.routes.navigate(['/company-task-requests']);
        }
        // this.role = res;
      });
    });

  }
  reject(taskReqId) {
    // //console.log("gg")
    this.companyService.rejectTask(taskReqId).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 2000
        });
      }
      if (res.success == true) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 2000
        });
        this.getNewTaskRequests()
        this.routes.navigate(['/company-task-requests']);
      }
    })
  }
  sendApproval(taskReqId) {
    // ////console.log("sdsd")
    this.companyService.sendApproval(taskReqId).subscribe(res => {
      //console.log(res);
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 2000
        });
      }
      if (res.success == true) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 2000
        });
        this.getNewTaskRequests()
      }
    })
  }
  getLastTaskDetails() {
    let assignId = this.taskRequest.tbl_user_profile.id;
    // //console.log(this.taskRequest);
    // //console.log(this.projectId);
    this.companyService.getLastTaskDetails(this.projectId, assignId).subscribe(res => {
      this.lastTask = res;
      this.lastDate = new Date(res[0].tbl_project_tasks[0].planned_end_date_time)
      let time = res[0].tbl_project_tasks[0].planned_end_date_time.split("T");
      let time2 = time[1].split('.')
      this.lastTime = time2[0];
      // //console.log(time2[0]);
    })
  }
  approvePop() {
    $('#sureModal').modal('show');

  }
  rejectPop() {
    $('#rejectModal').modal('show');

  }
  sendApprovalPop() {
    $('#approvalModal').modal('show');

  }
}
