
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { FormControl } from '@angular/forms';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'project-planning',
  templateUrl: './company-project-planning.component.html',
  styleUrls: ['./company-project-planning.component.css']
})
export class CompanyProjectPlanningComponent implements OnInit {
  todayDate = new Date();
  todayDate1: any;
  showSaveBtn: Boolean = false;
  disableCalculateBtn: Boolean = false;
  isSuccess: Boolean = true;
  isSucessCalculate: Boolean = true;
  is_show_verification_module: Boolean = false;
  projectSelectedTeam = [];
  myNewwArray: any;
  newdate: any;
  startdatetime: any;
  datepicker: Boolean = false;
  showstartdate: Boolean = false;
  saveBtnDisable: Boolean = false;
  endtime1: any;
  displayedColumns = ['slno', 'user', 'teamhead', 'start_date', 'start_time'];
  selected = '0';
  selected1 = '0';
  selected2 = '0';
  taskNo = 0
  datetime: any;
  disabled = []
  assigned_person: any;
  sum = 0;
  sum1 = 0;
  sub: any;
  team: any;
  arr1 = [];
  arr2 = [];
  startdate: any;
  team_id: any;
  // ------------------Assigned users--------------
  teamMembers = []
  meridain = 'AM'
  complexitys: any;
  startDate1 = []
  task_time = 0;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  @ViewChild('closeBtn4') closeBtn4: ElementRef;
  @ViewChild('projectEndDateModal') projectEndDateModal: ElementRef;


  shownewModule: Boolean = false;
  shownewTasks: Boolean = false;
  QcIcon: Boolean = false;
  DeveloperIcon: Boolean = false;
  DesignerIcon: Boolean = false
  teamheadselect: Boolean = false;
  projectEndDate: any;
  start_datetime: any;
  end_datetime: any;
  modules1: any;
  endtime: any;
  startTime: any;
  starttime: any
  endTime: any;
  assign_id: any;
  assign_fname: any;
  assign_lname: any;
  myArray: any;
  myArray1: any;
  myArray3: any;
  index: any;
  getWorkingTime: any;
  allteam: any;
  i: any;
  j: any;
  modules: any;
  name: '';
  p_id: '';
  spinner: Boolean = false;
  userData: any;
  Developers: any;
  is_team_head: any;
  id: any;
  assignPerson = [];
  assignPerson1: '';
  Designers: any;
  QCs: any;
  moduledata: any;
  plannedStartTime: any
  userAvailablity = [];
  showSpinner: Boolean = false;
  showSpinnersave: Boolean = false;
  endDatetime = {
    start_Date: ''
  }
  showUser = [];
  // -----assign task----
  assigntask = {
    // start_time: '',
    planned_hour: 0,
    buffer_hour: 0,
    total_hour: 0,
    // end_date :''
  }
  assignstart_date: any;
  assignend_date: any;
  assignstart_time: any;
  module = {
    module_name: '',
    time: 0,
    tbl_estimation_tasks: [],
    removeBtn: false
  };
  Projects = {
    name: '',
    code: '',
    start_date: new Date(),
    developer: [],
    designer: [],
    qc: [],
    selctedTeam: {},
    teamhead: '',
    start_time: { hour: 0, minute: 0, second: 0 }
  }
  moduleVerifTime: any;
  newTasks = {
    task_name: '',
    assigned_person: '',
    complexity: 0,
    planned_hour: 0,
    buffer_hour: 0,
    verification_hour: 0,
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    task_type: '',
    priority: '',
    assigned: '',
    assigned1: '',
    docFile: [],
    docSrc: '',
    color: '',
    bordercolor: '',
    file: '',
    newChecklist: [{ name: '' }],
    assigned_user: '',
    is_verif_task :false
  }
  newTasks1 = {
    task_name: '',
    assigned_person: '',
    complexity: 0,
    planned_hour: 0,
    buffer_hour: 0,
    verification_hour: 0,
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    task_type: '',
    priority: '',
    assigned: '',
    assigned1: '',
    docFile: [],
    docSrc: '',
    color: '',
    bordercolor: '',
    file: '',
    newChecklist: [{ name: '' }],
    assigned_user: '',
    removeBtn: false,
    is_verif_task :false,
  }
  assignedperdatevariable = {
    id: '',
    date: ''
  }
  assignedPersonDateArray = []
  assignedPersonDateArray1 = []
  startDateForCalc: any;
  taskdate: any;
  holidaydata = [];
  leavedata = [];
  worktime = [];
  offday = [];
  worktimedefault: any;
  offtaskdate: any;
  usertaskdate: any;
  worktaskdate: any;
  workstart_time: any;
  workend_time: any;
  is_not_planned_start_time = [];
  userid: any;
  working_hours: any;
  working_seconds: any;
  breaktime: any;
  totalbreaksec: any;
  totalEstimatedhr: any
  allteamhead: any;
  assignedpersonddatelement: any;
  allteamheadoldArray: any;
  assignedPersonEmpty: Boolean = false;
  meridian() {
    if (this.meridain == 'AM') {
      this.meridain = 'PM'
    }
    else if (this.meridain == 'PM') {
      this.meridain = 'AM'
    }
  }
  date = new FormControl(new Date());
  availstartDate: any;
  availstarTime: any;
  moduleIndex: any;
  taskIndex: any;
  assigned_user: any
  companyemployee: any;
  total_verification_time: any;
  serializedDate = new FormControl((new Date()).toISOString());
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  seconds: any;
  oldDevTeam = '';
  constructor(private route: ActivatedRoute, private companyService: CompanyService, public snackBar: MatSnackBar, private routes: Router, private dragulaService: DragulaService) {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.totalEstimatedhr = 0
    this.Projects.start_date = new Date();
    let hr = this.Projects.start_date.getHours();
    let mnt = this.Projects.start_date.getMinutes();
    let sec = this.Projects.start_date.getSeconds();
    this.Projects.start_time = { hour: hr, minute: mnt, second: sec }
    this.modules = [];
    this.myArray = [];
    this.myArray1 = [];
    this.myArray3 = [];
    this.holidaydata = [];
    this.assignedPersonDateArray = [];
    this.assignedPersonDateArray1 = [];
    this.offday = [];
    this.assignPerson = [];
    this.worktime = [];
    this.leavedata = [];
    this.is_not_planned_start_time = [];
    this.sub = this.route.params.subscribe(params => {
      this.p_id = params.id;
      this.companyService.getProjectById(this.p_id).subscribe(resData => {
        this.Projects.name = resData.project_name;
        this.Projects.code = resData.project_code
        this.totalEstimatedhr = resData.total_estimated_hour
      });
    });
    this.companyService.getDeveloperUsers().subscribe(developerDatas => {
      // console.log(developerDatas);
      this.Developers = developerDatas;
    });
    this.companyService.getDesignerrUsers().subscribe(designerDatas => {
      this.Designers = designerDatas;
    });
    this.companyService.getQcUsers().subscribe(qcDatas => {
      this.QCs = qcDatas;
    });
    this.companyService.getTasksModules(this.p_id).subscribe(data => {
      this.moduledata = data
      this.total_verification_time = 0;
      this.moduledata.forEach(element => {
        this.modules.push(element);
        this.task_time = 0;

        this.arr1.push(element.tbl_estimation.estimation_hour)
          ;
        element.tbl_estimation_tasks.forEach(elementimation_tasks => {
          this.task_time = this.task_time + elementimation_tasks.planned_hour + elementimation_tasks.buffer_hour;
          this.total_verification_time = this.total_verification_time + elementimation_tasks.verification_hour;
          elementimation_tasks.newChecklist = []
        })
        element.time = this.task_time;
      })
      this.arr1.forEach(element2 => {
        this.sum = this.sum + element2;
      });
      this.companyService.getAllUsers().subscribe(team => {
        this.team = team
        // this.assignPerson = asignedPerson;
      });
      this.companyService.getComplexity().subscribe(complexity => {
        this.complexitys = complexity;
      });
    });
    this.companyService.getWorkingTime().subscribe(getWorkingTime => {
      this.getWorkingTime = getWorkingTime;
    });

    this.companyService.getallTeamsforassign().subscribe(res => {
      this.allteam = res;
    });

    this.companyService.getAllcompanyemployeeWithTeam().subscribe(res => {
      this.companyemployee = res;
      // console.log(this.companyemployee);
    });
  }

  chooseTeamMember() {
    let userOldArr = [];
    userOldArr = this.projectSelectedTeam;
    let OldSelectedUserId = [];
    userOldArr.forEach((element) => {
      OldSelectedUserId.push(element.id);
    });
    this.projectSelectedTeam = [];
    let selectedUserId = [];
    // console.log(this.Projects.developer);
    this.allteam.forEach(element1 => {
      if (this.Projects.selctedTeam[element1.id] && this.Projects.selctedTeam[element1.id].length > 0) {
        this.Projects.selctedTeam[element1.id].forEach(element => {
          // console.log(element);
          element.team_id = element1.id;
          if (selectedUserId.indexOf(element.id) == -1) {
            if (OldSelectedUserId.indexOf(element.id) == -1) {
              element.start_date = this.Projects.start_date
              element.start_time = this.Projects.start_time;
              element.team_name = element1.team_name;
              this.projectSelectedTeam.push(element);
            } else {
              userOldArr.forEach((elm) => {
                if (elm.id == element.id) {
                  element.start_date = elm.start_date
                  element.start_time = elm.start_time;
                  element.team_name = element1.team_name;
                }
              });
              selectedUserId.push(element.id);
              this.projectSelectedTeam.push(element);
              // console.log(this.projectSelectedTeam)
            }
          }
        });
      }
    });

    // if (this.Projects.designer && this.Projects.designer.length > 0) {
    //   this.Projects.designer.forEach(element => {
    //     element.team_id = 2;
    //     if (selectedUserId.indexOf(element.id) == -1) {
    //       if (OldSelectedUserId.indexOf(element.id) == -1) {
    //         element.start_date = this.Projects.start_date
    //         element.start_time = this.Projects.start_time;
    //         this.projectSelectedTeam.push(element);
    //       } else {
    //         userOldArr.forEach((elm) => {
    //           if (elm.id == element.id) {
    //             element.start_date = elm.start_date
    //             element.start_time = elm.start_time;
    //           }
    //         });
    //         selectedUserId.push(element.id);
    //         this.projectSelectedTeam.push(element);
    //       }
    //     }
    //   });
    // }
    // if (this.Projects.qc && this.Projects.qc.length > 0) {
    //   this.Projects.qc.forEach(element => {
    //     element.team_id = 3;
    //     if (selectedUserId.indexOf(element.id) == -1) {
    //       if (OldSelectedUserId.indexOf(element.id) == -1) {
    //         element.start_date = this.Projects.start_date
    //         element.start_time = this.Projects.start_time;
    //         this.projectSelectedTeam.push(element);
    //       } else {
    //         userOldArr.forEach((elm) => {
    //           if (elm.id == element.id) {
    //             element.start_date = elm.start_date
    //             element.start_time = elm.start_time;
    //           }
    //         });
    //         selectedUserId.push(element.id);
    //         this.projectSelectedTeam.push(element);
    //       }
    //     }
    //   });
    // }
    this.dataSource = new MatTableDataSource(this.projectSelectedTeam);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onTeamHeadChange(value) {

    console.log(value)
    if (value.is_team_head == true) {

      this.projectSelectedTeam.forEach(element => {
       
        if (element.is_team_head == true && element.id !== value.id) {
          element.is_team_head = false
        }
      });

      this.Projects.teamhead = value;
    }

    // if(value.is_team_head == true){
    //   this.Projects.teamhead = value;
    // }

    // ---------------------------------Start-------------------------------------------
    // Function      : best plan
    // Params        : id and value
    // Returns       : 
    // Author        : Rinsha
    // Date          : 07-03-2018
    // Last Modified : 07-03-2018, Rinsha
    // Desc          : to change a plan to best

    // ---------------------------------End-------------------------------------------
  }


  addMore() {
    this.newTasks.newChecklist.push({ name: '' });
  }
  addMoreFromEdit() {
    this.newTasks.newChecklist.push({ name: '' });
  }
  closeChecklist(index) {
    this.newTasks.newChecklist.splice(index, 1);
    // if (this.newTasks.newChecklist.length > 1) {
    //   this.newTasks.newChecklist.splice(index, 1);
    // } else {
    //   let snackBarRef = this.snackBar.open('* Atleast one item required!', '', {
    //     duration: 2000
    //   });
    //   return false;
    // }
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
  modalClear() {
    this.newTasks = {
      task_name: '',
      assigned_person: '',
      complexity: 0,
      planned_hour: 0,
      buffer_hour: 0,
      verification_hour: 0,
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
      task_type: '',
      assigned1: '',
      priority: '',
      assigned: '',
      docFile: [],
      docSrc: '',
      color: '',
      bordercolor: '',
      file: '',
      newChecklist: [{ name: '' }],
      assigned_user: '',
      is_verif_task :false
    };
  }
  addModule() {
    if (this.module.module_name == '') {
      let snackBarRef = this.snackBar.open("Module Name cannot be blank", '', {
        duration: 2000
      });
    }
    else {
      if (this.is_show_verification_module == true) {
        this.modules.splice(-1, 1)
        this.is_show_verification_module = false;
      }
      this.modules.push(this.module);
      let snackBarRef = this.snackBar.open("Module added successfully", '', {
        duration: 2000
      });
      this.module = {
        module_name: '',
        time: 0,
        tbl_estimation_tasks: [],
        removeBtn: false
      };
    }
  }
  addModuleClear() {
    this.module = {
      module_name: '',
      time: 0,
      tbl_estimation_tasks: [],
      removeBtn: false
    };
  }

  getId(index) {
    // if(this.Projects.developer == [] || this.Projects.designer == [] || this.Projects.qc == [] ){

    this.index = index;
    this.newTasks = {
      task_name: '',
      assigned_person: '',
      complexity: 0,
      planned_hour: 0,
      buffer_hour: 0,
      verification_hour: 0,
      start_date: '',
      assigned: '',
      start_time: '',
      end_date: '',
      assigned1: '',
      end_time: '',
      task_type: '',
      priority: '',
      docFile: [],
      docSrc: '',
      color: '',
      bordercolor: '',
      file: '',
      newChecklist: [{ name: '' }],
      assigned_user: '',
      is_verif_task :false
    };
  }
  getassigned() {
    this.assigned_person = this.newTasks.assigned_person;
    this.assigned_person.tbl_team_assocs.forEach(teamId => {
      this.team_id = teamId.team_id;
    });
    this.assign_id = this.assigned_person.id;
    this.assign_fname = this.assigned_person.f_name;
    this.assign_lname = this.assigned_person.l_name;
  }
  addTask(index) {

    this.newTasks.assigned_user = ''
    this.companyService.getDatetime(this.newTasks).subscribe(datetime => {
      this.datetime = datetime;
      if (this.datetime.success == false) {
        let snackBarRef = this.snackBar.open(this.datetime.msg, '', {
          duration: 2000
        });
      }
      else {
        this.total_verification_time = this.total_verification_time + this.newTasks.verification_hour;
        if (this.is_show_verification_module == true) {
          this.modules[this.modules.length - 1].time = this.total_verification_time;
          this.modules[this.modules.length - 1].tbl_estimation_tasks[0].planned_hour = this.total_verification_time;
        }
        // this.total_verification_time = this.total_verification_time + this.newTasks.verification_hour;
        // this.module.time = this.total_verification_time;
        //  this.newTasks1.planned_hour = this.total_verification_time;

        if (this.newTasks.assigned_person) {
          this.newTasks.color = '#e6ffe6';
          this.newTasks.bordercolor = '3px solid #6fa93b';
          this.newTasks.assigned_user = this.newTasks.assigned_person
          // this.assigned_user  = this.newTasks.assigned_person
          // this.modules[this.moduleIndex].tbl_estimation_tasks[this.taskIndex].assigned_user = this.newTasks.assigned_person;
        }
        this.modules[index].tbl_estimation_tasks.push(this.newTasks);
        this.modules[index].time = this.modules[index].time + this.newTasks.planned_hour + this.newTasks.buffer_hour;
        this.sum = this.sum + this.newTasks.planned_hour + this.newTasks.buffer_hour;

        this.closeBtn.nativeElement.click();
        let snackBarRef = this.snackBar.open(' Task added succesfully', '', {
          duration: 2000
        });
        // console.log(this.modules);
        this.newTasks = {
          task_name: '',
          assigned_person: '',
          complexity: 0,
          planned_hour: 0,
          buffer_hour: 0,
          verification_hour: 0,
          start_date: '',
          start_time: '',
          end_date: '',
          end_time: '',
          assigned: '',
          assigned1: '',
          task_type: '',
          priority: '',
          color: '',
          bordercolor: '',
          docFile: [],
          docSrc: '',
          file: '',
          newChecklist: [{ name: '' }],
          assigned_user: '',
          is_verif_task :false
        };
      }
    })
  }
  deleteModule(i) {
    this.moduleVerifTime = 0;
    this.modules[i].tbl_estimation_tasks.forEach(element => {
      this.moduleVerifTime = this.moduleVerifTime + element.verification_hour;
    });
    this.total_verification_time = this.total_verification_time - this.moduleVerifTime;
    if (this.is_show_verification_module == true) {
      this.modules[this.modules.length - 1].time = this.total_verification_time;
      this.modules[this.modules.length - 1].tbl_estimation_tasks[0].planned_hour = this.total_verification_time;
    }


    this.sum = this.sum - this.modules[i].time;

    this.modules.splice(i, 1);
  }
  editModules(i, module) {
    this.modules.splice(i, 1);
    this.modules.push(module);
    this.modules.forEach(element => {
    });
  }
  getId1(i, j, ) {
    this.i = i;
    this.j = j;
  }
  getId2(i, j, task) {

    if (typeof this.Projects.developer.length !== 'undefined' && this.Projects.developer.length == 0 && typeof this.Projects.designer.length !== 'undefined' && this.Projects.designer.length == 0 && typeof this.Projects.qc.length !== 'undefined' && this.Projects.qc.length == 0) {
      this.assignedPersonEmpty = true
    } else {
      this.assignedPersonEmpty = false
    }
    this.i = i;
    this.j = j;
    this.newTasks = task;
    this.modules[i].tbl_estimation_tasks[j] = this.newTasks;
    this.sum = this.sum - this.modules[i].tbl_estimation_tasks[j].planned_hour - this.modules[i].tbl_estimation_tasks[j].buffer_hour;
    this.modules[i].time = this.modules[i].time - this.modules[i].tbl_estimation_tasks[j].planned_hour - this.modules[i].tbl_estimation_tasks[j].buffer_hour;
    // this.newTasks.assigned_person = '';
    this.newTasks.start_date = '';
    this.newTasks.start_time = '';
    this.meridain = '';
    this.total_verification_time = this.total_verification_time - this.modules[i].tbl_estimation_tasks[j].verification_hour;
    // if (this.is_show_verification_module == true) {
    //   this.modules[this.modules.length - 1].time = this.total_verification_time;
    //   this.modules[this.modules.length - 1].tbl_estimation_tasks[0].planned_hour = this.total_verification_time;
    // }

  }
  getId3(i, j, task) {
    if (typeof this.projectSelectedTeam !== 'undefined' && this.projectSelectedTeam.length == 0) {
      this.assignedPersonEmpty = true
    } else {
      this.assignedPersonEmpty = false
    }
    this.i = i;
    this.j = j;
    this.newTasks = task;
    this.modules[i].tbl_estimation_tasks[j] = this.newTasks;
    // this.newTasks.assigned_person = '';
  }
  deleteTask(i, j) {
    this.total_verification_time = this.total_verification_time - this.modules[i].tbl_estimation_tasks[j].verification_hour;
    if (this.is_show_verification_module == true) {
      this.modules[this.modules.length - 1].time = this.total_verification_time;
      this.modules[this.modules.length - 1].tbl_estimation_tasks[0].planned_hour = this.total_verification_time;
    }
    this.modules[i].time = this.modules[i].time - this.modules[i].tbl_estimation_tasks[j].planned_hour - this.modules[i].tbl_estimation_tasks[j].buffer_hour;
    this.sum = this.sum - this.modules[i].tbl_estimation_tasks[j].planned_hour - this.modules[i].tbl_estimation_tasks[j].buffer_hour;
    this.modules[i].tbl_estimation_tasks.splice(this.j, 1);



  }
  editTask(i, j, users) {
    this.companyService.editTaskValidation(this.newTasks).subscribe(editTaskValidation => {
      if (!editTaskValidation.success) {
        let snackBarRef = this.snackBar.open(editTaskValidation.msg, '', {
          duration: 2000
        });
      } else {
        console.log(this.total_verification_time)
        this.total_verification_time = this.total_verification_time - this.modules[i].tbl_estimation_tasks[j].verification_hour;
        this.total_verification_time = this.total_verification_time + this.newTasks.verification_hour;
        console.log(this.total_verification_time)

        if (this.is_show_verification_module == true) {
          this.modules[this.modules.length - 1].time = this.total_verification_time;
          this.modules[this.modules.length - 1].tbl_estimation_tasks[0].planned_hour = this.total_verification_time;
        }
        // if(this.is_show_verification_module == true){
        //   this.modules.splice(-1,1)
        //   this.is_show_verification_module = false;
        // }
        // if (this.newTasks.assigned_person) {
        //   this.modules[i].tbl_estimation_tasks[j].assigned_user = this.newTasks.assigned_person;
        //   this.modules[i].tbl_estimation_tasks[j].color = '#e6ffe6';
        //   this.modules[i].tbl_estimation_tasks[j].bordercolor = '3px solid #6fa93b';
        // }

        this.modules[i].time = this.modules[i].time - this.modules[i].tbl_estimation_tasks[j].planned_hour - this.modules[i].tbl_estimation_tasks[j].buffer_hour;
        this.modules[i].time = this.modules[i].time + this.newTasks.planned_hour + this.newTasks.buffer_hour;
        this.sum = this.sum + this.newTasks.planned_hour + this.newTasks.buffer_hour;

        this.closeBtn1.nativeElement.click();
        let snackBarRef = this.snackBar.open(' Task updated succesfully', '', {
          duration: 2000
        });



      }
    });
  }
  assignTask(i, j, users) {
    if (this.newTasks.assigned_person == '') {
      let snackBarRef = this.snackBar.open(' Please select a person to assign the task', '', {
        duration: 2000
      });
    }
    if (this.newTasks.assigned_person) {
      this.modules[i].tbl_estimation_tasks[j].assigned_user = this.newTasks.assigned_person;
      this.modules[i].tbl_estimation_tasks[j].color = '#e6ffe6';
      this.modules[i].tbl_estimation_tasks[j].bordercolor = '3px solid #6fa93b';
      this.closeBtn3.nativeElement.click();
      let snackBarRef = this.snackBar.open(' Assigned Successfully', '', {
        duration: 2000
      });
    }
  }
  inArray(needle, haystack) {
    var count = haystack.length;
    for (var i = 0; i < count; i++) {
      if (haystack[i] === needle) { return true; }
    }
    return false;
  }
  // getEnddatetime() {
  //   const users: any[] = [];
  //   this.startdate = '';
  //   this.starttime = '';
  //   this.endtime = '';
  //   this.startdate = this.assignstart_date;
  //   this.starttime = this.assignstart_time;
  //   this.endtime = this.assignstart_time
  //   this.teamMembers = [];
  //   if (this.inArray(this.assign_id, this.teamMembers) == false) {
  //     this.modules.forEach(modules => {
  //       modules.tbl_estimation_tasks.forEach(tasks => {
  //         tasks.start_date = this.assignstart_date;
  //         tasks.start_time = this.assignstart_time;
  //       });
  //     });
  //     this.assignstart_date.setHours(this.assignstart_time.hour, this.assignstart_time.minute, this.assignstart_time.second);
  //     this.teamMembers.push({ assign_person_id: this.assign_id, start_date: this.assignstart_date, start_time: this.assignstart_time, assigned_person_fname: this.assign_fname, assigned_person_lname: this.assign_lname, hour: this.newTasks.planned_hour + this.newTasks.buffer_hour, no_task: this.taskNo = this.taskNo + 1, team_id: this.team_id });
  //     this.startdatetime = this.assignstart_date
  //     this.assignend_date = this.startdate;
  //     this.teamMembers.forEach((item, index) => {
  //       users.push({
  //         userfname: item.assigned_person_fname,
  //         userlname: item.assigned_person_lname,
  //         id: item.assign_person_id,
  //         start_date: this.assignstart_date,
  //         end_date: '',
  //         hour: 0,
  //         no_task: 0
  //       });
  //     });
  //     this.dataSource = new MatTableDataSource(users);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  // }
  // getTableData() {
  //   const users: any[] = [];
  //   if (this.selected == '1') {
  //     if (this.teamMembers == [] || this.teamMembers == null) {
  //     }
  //     else {
  //       this.teamMembers.forEach(item => {
  //         ;
  //         if (item.team_id == 1) {
  //           users.push({
  //             userfname: item.assigned_person_fname,
  //             userlname: item.assigned_person_lname,
  //             id: item.assign_person_id,
  //             start_date: item.start_date,
  //             end_date: item.end_date,
  //             hour: item.hour,
  //             no_task: item.no_task
  //           });
  //           this.dataSource = new MatTableDataSource(users);
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         } else {
  //           let snackBarRef = this.snackBar.open('* No data found!', '', {
  //             duration: 2000
  //           });
  //         }
  //       });
  //     }
  //     this.loadToDataTable(this.Developers);
  //   }
  //   if (this.selected == '2') {
  //     this.loadToDataTable(this.Designers);
  //   }
  //   if (this.selected == '3') {
  //     this.loadToDataTable(this.QCs);
  //   }
  // }
  // loadToDataTable(data) {
  //   this.dataSource = new MatTableDataSource(data);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  showDatepicker() {
    this.datepicker = true;
    this.showstartdate = false;
  }
  showDate() {
    this.showstartdate = true;
    this.datepicker = false;
  }
  finish() {
  }
  assignedAuser(users) {
    //not need now
  }
  calculateEnddate() {

    this.isSucessCalculate = true;
    this.disableCalculateBtn = true;
    let startDateOfProject = this.Projects.start_date.setHours(this.Projects.start_time.hour, this.Projects.start_time.minute, this.Projects.start_time.second);
    this.projectSelectedTeam.forEach(eachMemeber => {

      if (eachMemeber.is_team_head) {
        this.teamheadselect = true;
      }
    });
    if (this.teamheadselect) {
      if (this.Projects.start_date < new Date()) {
        let snackBarRef = this.snackBar.open('Failed! Please select a valid project start date', '', {
          duration: 2000
        });
        this.disableCalculateBtn = false;
        this.isSucessCalculate = false;
      } else {
        this.projectSelectedTeam.forEach(eachMemeber => {
          eachMemeber.start_date.setHours(eachMemeber.start_time.hour, eachMemeber.start_time.minute, eachMemeber.start_time.second);

          if (eachMemeber.is_team_head) {
            this.teamheadselect = true;
            // let snackBarRef = this.snackBar.open('Failed! Please select a team head ', '', {
            //   duration: 2000
            // });
          }

          if (eachMemeber.start_date < new Date()) {
            let snackBarRef = this.snackBar.open('Failed! Please select a valid start date for the team member ' + eachMemeber.f_name + ' ' + eachMemeber.l_name + '', '', {
              duration: 2000
            });
            this.disableCalculateBtn = false;
            this.isSucessCalculate = false;
          } else {
            if ((new Date(startDateOfProject)) > eachMemeber.start_date) {
              let snackBarRef = this.snackBar.open('Failed! Please select a date after project start date for team member ' + eachMemeber.f_name + ' ' + eachMemeber.l_name + '', '', {
                duration: 2000
              });
              this.disableCalculateBtn = false;
              this.isSucessCalculate = false;
            } else {
              this.modules.forEach(eachModule => {
                if (typeof eachModule.tbl_estimation_tasks.length !== 'undefined' && eachModule.tbl_estimation_tasks.length == 0) {
                  let snackBarRef = this.snackBar.open('Failed! Each module should contain atleast one task', '', {
                    duration: 2000
                  });
                  this.disableCalculateBtn = false;
                  this.isSucessCalculate = false;
                } else {
                  eachModule.tbl_estimation_tasks.forEach(task => {
                    if (!task.assigned_person) {
                      let snackBarRef = this.snackBar.open('Failed! Each task should be assigned to a team member', '', {
                        duration: 2000
                      });
                      this.disableCalculateBtn = false;
                      this.isSucessCalculate = false;
                    }
                  });
                }
              });
            }
          }
        });
      }

      if (this.isSucessCalculate) {
        if (this.is_show_verification_module == false) {
          this.module.module_name = "verification";
          this.module.time = this.total_verification_time;
          this.module.removeBtn = true;
          this.newTasks1.task_name = "Verify all tasks in Project : " + this.Projects.name + " ";
          this.newTasks1.assigned_person = this.Projects.teamhead;
          this.newTasks1.assigned_user = this.Projects.teamhead;
          this.newTasks1.planned_hour = this.total_verification_time;
          this.newTasks1.color = '#e6ffe6';
          this.newTasks1.removeBtn = true;
          this.newTasks1.is_verif_task = true;
          this.newTasks1.bordercolor = '3px solid #6fa93b';
          this.module.tbl_estimation_tasks.push(this.newTasks1);

          this.modules.push(this.module);
          // this.modules.splice(-1,1)
        }
        this.is_show_verification_module = true;
        this.showSpinner = true;

        let data = { modules: this.modules, teamMembers: this.projectSelectedTeam };
        this.companyService.getUserleavedataplanning(data).subscribe(data => {

          this.showSpinner = false;
          let tmp = data;
          data.data.projectStartDate = new Date(this.Projects.start_date);
          data.data.projectStartDate.setHours(this.Projects.start_time.hour, this.Projects.start_time.minute, this.Projects.start_time.second);
        
          data.data.project_team_head = this.Projects.teamhead;
          this.projectEndDate = new Date(data.data.projectEndDate);
          console.log( this.projectEndDate)
          $('#projectEndDateModal').modal('show');
          data.data.project_id = this.p_id;
          this.modules = data.data;
          
          this.showSaveBtn = true;
          this.disableCalculateBtn = false;
        });
      }
    }
    if (!this.teamheadselect) {
      let snackBarRef = this.snackBar.open('Failed! Please select a Team head', '', {
        duration: 2000
      });
      this.disableCalculateBtn = false;
      this.isSucessCalculate = false;
    }
  }
  
  savePlanningData() {
    this.saveBtnDisable = true;
    this.isSuccess = true;
    this.disableCalculateBtn = true;
    this.showSpinnersave = true;
    let startDateOfProject = this.Projects.start_date.setHours(this.Projects.start_time.hour, this.Projects.start_time.minute, this.Projects.start_time.second);
    if (this.Projects.start_date < new Date()) {
      let snackBarRef = this.snackBar.open('Failed! Please select a valid project start date', '', {
        duration: 2000
      });
      this.disableCalculateBtn = false;
      this.saveBtnDisable = false;
      this.isSuccess = false;
      this.showSpinnersave = false;
    } else {
      this.projectSelectedTeam.forEach(eachMemeber => {
        eachMemeber.start_date.setHours(eachMemeber.start_time.hour, eachMemeber.start_time.minute, eachMemeber.start_time.second);
        if (eachMemeber.start_date < new Date()) {
          let snackBarRef = this.snackBar.open('Failed! Please select a valid start date for the team member ' + eachMemeber.f_name + ' ' + eachMemeber.l_name + '', '', {
            duration: 2000
          });
          this.disableCalculateBtn = false;
          this.saveBtnDisable = false;
          this.isSuccess = false;
          this.showSpinnersave = false;
        } else {
          if ((new Date(startDateOfProject)) > eachMemeber.start_date) {
            let snackBarRef = this.snackBar.open('Failed! Please select a date after project start date for team member ' + eachMemeber.f_name + ' ' + eachMemeber.l_name + '', '', {
              duration: 2000
            });
            this.disableCalculateBtn = false;
            this.saveBtnDisable = false;
            this.isSuccess = false;
            this.showSpinnersave = false;
          } else {
            this.modules.forEach(eachModule => {
              if (typeof eachModule.tbl_estimation_tasks.length !== 'undefined' && eachModule.tbl_estimation_tasks.length == 0) {
                let snackBarRef = this.snackBar.open('Failed! Each module should contain atleast one task', '', {
                  duration: 2000
                });
                this.disableCalculateBtn = false;
                this.saveBtnDisable = false;
                this.isSuccess = false;
                this.showSpinnersave = false;
              } else {
                eachModule.tbl_estimation_tasks.forEach(task => {
                  if (!task.assigned_person) {
                    let snackBarRef = this.snackBar.open('Failed! Each task should be assigned to a team member', '', {
                      duration: 2000
                    });
                    this.disableCalculateBtn = false;
                    this.saveBtnDisable = false;
                    this.isSuccess = false;
                    this.showSpinnersave = false;
                  }
                });
              }
            });
          }
        }
      });
    }

    if (this.isSuccess) {
      this.saveBtnDisable = false;
      this.companyService.savecompanyPlanning(this.modules,this.Projects.teamhead).subscribe(data => {
        this.showSpinnersave = false;
        if (data.success) {
          this.routes.navigate(['/project']);
          let snackBarRef = this.snackBar.open(data.msg, '', {
            duration: 2000
          });

        } else {
          let snackBarRef = this.snackBar.open(data.msg, '', {
            duration: 2000
          });

        }
      });
    }
  }
  projectStartDateSelect() {
    this.assignstart_date = this.Projects.start_date;
    this.assignstart_time = this.Projects.start_time;
    this.modules.forEach(modules => {
      modules.tbl_estimation_tasks.forEach(tasks => {
        tasks.start_date = this.Projects.start_date;
        tasks.start_time = this.Projects.start_time;
      });
    });
    this.projectSelectedTeam.forEach(element => {
      if (element.start_date < this.Projects.start_date) {
        element.start_date = this.Projects.start_date
        element.start_time = this.Projects.start_time;
      }
      else if (element.start_date == this.Projects.start_date) {

        let newstartTimeofUser = this.changeTimepikcerFormat(element.start_time.hour, element.start_time.minute, element.start_time.second)
        let newstartTimeofProject = this.changeTimepikcerFormat(this.Projects.start_time.hour, this.Projects.start_time.minute, this.Projects.start_time.second)

        if (this.timeToSec(newstartTimeofUser) < this.timeToSec(newstartTimeofProject)) {
          element.start_time = this.Projects.start_time;
        }
      }
    });
    this.todayDate1 = this.Projects.start_date;
  }
  setAvailableDateTimeofUser(date, time) {
    this.projectSelectedTeam.forEach((element, key) => {
      if (element.start_date == this.Projects.start_date) {
        let newstartTimeofUser = this.changeTimepikcerFormat(element.start_time.hour, element.start_time.minute, element.start_time.second)
        let newstartTimeofProject = this.changeTimepikcerFormat(this.Projects.start_time.hour, this.Projects.start_time.minute, this.Projects.start_time.second)
        // if ((this.timeToSec(newstartTimeofUser)) < (this.timeToSec(newstartTimeofProject))) {
        //   this.projectSelectedTeam[key].start_time = this.Projects.start_time;
        // }
      }
    });

    // this.dataSource = new MatTableDataSource(this.projectSelectedTeam);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // this.availstartDate = date
    // this.availstarTime = this.changeTimepikcerFormat(time.hour,time.minute,time.second)
    // let startTimeOfProject = this.changeTimepikcerFormat(this.Projects.start_time.hour,this.Projects.start_time.minute,this.Projects.start_time.second)
    // if(date = this.Projects.start_date){
    //   if(this.timeToSec(this.availstarTime) < this.timeToSec(startTimeOfProject)){
    //     time = this.Projects.start_time;
    //   }
    // }

  }
  timeToSec(time) {
    var a = time.split(':'); // split it at the colons\
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    return this.seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  }
  changeTimepikcerFormat(hour, minute, second) {
    var hh = hour
    var mm = minute
    var ss = second
    if (hh < 10) { hh = "0" + hh; }
    if (mm < 10) { mm = "0" + mm; }
    if (ss < 10) { ss = "0" + ss; }
    // This formats your string to HH:MM:SS
    let splittedTime = hh + ":" + mm + ":" + ss;
    return splittedTime
  }
  closeEditModal(i, j) {
    this.modules[i].time = this.modules[i].time + this.newTasks.planned_hour + this.newTasks.buffer_hour;
    this.total_verification_time = this.total_verification_time + this.modules[i].tbl_estimation_tasks[j].verification_hour;

    if (this.is_show_verification_module == true) {
      this.modules[this.modules.length - 1].time = this.total_verification_time;
      this.modules[this.modules.length - 1].tbl_estimation_tasks[0].planned_hour = this.total_verification_time;
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