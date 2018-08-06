
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { SimpleTimer } from 'ng2-simple-timer';
import { Observable } from 'rxjs/Rx';
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
@Component({
  selector: 'user-task-management',
  templateUrl: './user-task-management.component.html',
  styleUrls: ['./user-task-management.component.css']
})
export class UserTaskManagementComponent implements OnInit {
  private socket: any;
  statusID: any;
  done = [];
  hold = [];
  Resume = [];
  completed = [];
  viewAll1: Boolean = true
  selectbox: boolean = false;
  showTasks: Boolean = false;
  preloader :Boolean = false;
  finishedAllTaskInaModule: Boolean = true;
  array1: any;
  selected: any;
  lastItem: any;
  pause = []
  alltask = [];
  show = [];
  play = [];
  showselectedtasks = [];
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  taskthisId: any;
  task_time: any;
  index: any;
  showTeam: Boolean = false;
  percentages: any;
  assigned_id: any;
  disabled: Boolean = false;
  module_id: any;
  moduleid: any;
  showComplexity: Boolean = false;
  min: number;
  sec: number;
  miliSec: number;
  timer: any;
  showNoDataExist :Boolean = false;
  lastTimeStatus: any;
  projects: any;
  i: any;
  j: any;
  taskId: any;
  complexitys: any;
  task_id: any;
  disableTask = [];
  disable: Boolean = false;
  sendRequestBtnDisable :Boolean = false;
  sendRequestSpinner :Boolean = false;
  aditionaltaskBtnDisable :Boolean = false;
  aditionaltaskSpinner :Boolean = false;
  count = 0;
  Projects = {
    name: '',
    code: '',
    start_date: '',
    developer: [],
    designer: [],
    qc: [],
    start_time: ''
  }
  modules = [];
  module = {
    module_name: '',
    time: 0,
    tbl_estimation_tasks: [],
  };
  sub: any;
  myTasks: any;
  userData = [{
    f_name: '',
    l_name: '',
    id: '',
    tbl_team_assocs: []
  }]
  p_id: '';
  newTasks = {
    id: '',
    task_name: '',
    assigned_person: '',
    complexity: '',
    percentage: '',
    planned_hour: 0,
    buffer_hour: 0,
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: 0,
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
    reason: '',
    newChecklist: [{ name: '' }],
    status: '',
    timestatus: '',
    tbl_complexity_percentage: { percentage: '' },
    hour: 0,
    minutes: 0,
    seconds: 0,
    totalhour: ''
  }
  showAddModuleBtn: Boolean = false;
  getId(index, id) {
    this.module_id = id;
    this.index = index;
    // console.log(index + "  index");
    this.newTasks = {
      id: '',
      task_name: '',
      assigned_person: '',
      complexity: '',
      percentage: '',
      planned_hour: 0,
      buffer_hour: 0,
      start_date: '',
      assigned: '',
      start_time: '',
      end_date: '',
      assigned1: '',
      module_id: '',
      end_time: 0,
      task_type: '',
      priority: '',
      docFile: [],
      time: 0,
      docSrc: '',
      file: '',
      team: '',
      description: '',
      timerequired: '',
      reason: '',
      status: '',
      timestatus: '',
      newChecklist: [{ name: '' }],
      tbl_complexity_percentage: { percentage: '' },
      hour: 0,
      minutes: 0,
      seconds: 0,
      totalhour: ''
    };
  }
  lastStatus: any;
  taskToShow: any;
  showDetails: any;
  showDetails1: any;
  taskTym: any;
  appendHour: number = 0;
  appendMinute: number = 0
  appendSecond: number = 0
  endDatetym: any;
  hours: any;
  minutes: any;
  seconds: any;
  // ----------------stopwatch-----------
  // b: any;
  b = [];
  hour: number = 0;
  miniutes: number = 0;
  second: number = 0;
  // a: any;
  a = [];
  // countt: any;
  countt = [];
  intervel: number = 0;
  ans: any;
  s_id: any;
  // ----------------stopwatch-----------
  time = {
    hour: 0,
    minutes: 0,
    seconds: 0,
    id: 0
  }
  lastStatusEndDate: any;
  diff: any;
  showthisTask = [];
  lastStatusid: any;
  showRequest = [];


  viewAllTasks = false;
  inProgressTaskId = '';
  allteam :any;
 showAllContent = false;
  constructor(private route: ActivatedRoute, private config: Config, private userService: UserService, private companyService: CompanyService, public snackBar: MatSnackBar, private st: SimpleTimer) { this.socket = socketIo(config.siteUrl); }
  ngOnInit() {
    this.preloader =true;
    this.showAddModuleBtn = true;
    this.userService.getUserProjects().subscribe(resProjects => {
      this.projects = resProjects
    })
    this.socket.on('newtaskrequestAccepted', (data) => {
      this.getmytasks();
    });
    this.socket.on('approvetimeextentionrequest', (data) => {
      this.getmytasks();
    });

    this.userService.getAllTasksInModule().subscribe(alltasks => {
      this.alltask = alltasks;
      // this.alltask.forEach(element => {

      // });
    });
    this.userService.getTaskTime().subscribe(taskTime => {
      this.alltask = taskTime;
    });
    this.miliSec = 0;
    this.min = 0;
    this.userService.getUserProfile().subscribe(data1 => {
      // console.log(data1);
      this.userData = data1;
      this.userData.forEach(element => {
        this.assigned_id = element.id
        element.tbl_team_assocs.forEach(team => {
          this.count = this.count + 1;
        });
      });
      console.log(this.count)
      if (this.count > 1) {
        this.showTeam = true;
      }
    })
    this.companyService.getComplexity().subscribe(complexity => {
      this.complexitys = complexity;
    });
    this.selected = 'all';
    this.getmytasks();
    this.userService.getPercentage().subscribe(percentage => {
      this.percentages = percentage
    });
    
    this.companyService.getallTeamsforassign().subscribe(res => {
      this.allteam = res;
      // console.log(this.allteam)
    });
  }
  viewAll() {
    this.viewAllTasks = true;
    this.getmytasks();
  }
  todayTask() {
    this.viewAllTasks = false;
    this.getmytasks();
  }
  addTask(index) {
    // this.aditionaltaskBtnDisable =true
    // this.aditionaltaskSpinner = true;
    this.newTasks.assigned_person = this.assigned_id;
    this.newTasks.module_id = this.module_id;
    // console.log(this.newTasks);
    this.userService.newTaskRequest(this.newTasks).subscribe(data => {
      if (data.success) {
        this.aditionaltaskBtnDisable =false
        this.aditionaltaskSpinner = false;
        this.closeBtn.nativeElement.click();
        let snackBarRef = this.snackBar.open('Request send successfully', '', {
          duration: 2000
        });
      } else {
        this.aditionaltaskBtnDisable =false
        this.aditionaltaskSpinner = false;
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
      }
    });
  }

  getId1(task, i, j) {
    this.taskId = task.id;
    this.i = i;
    this.j = j;
    this.newTasks = task;
    this.newTasks.timerequired = '';
    // console.log(this.newTasks);
    //   this.myTasks.forEach(element => {
    //     element.tbl_project_tasks.forEach(project_tasks => {
    //       console.log(project_tasks.tbl_complexity_percentage.percentage);
    //     });
    //   });
  }
  TimeExtention(newTasks) {
    this.sendRequestBtnDisable= true;
    this.sendRequestSpinner = true;
    if (!newTasks.timerequired || typeof (newTasks.timerequired) !== 'number') {
      let snackBarRef = this.snackBar.open('Invalid!, Please fill the required time', '', {
        duration: 2000
      });
      this.sendRequestBtnDisable= false;
      this.sendRequestSpinner = false;
    }
    else {
      // console.log(newTasks)
      this.userService.newTimeExtention(newTasks).subscribe(data => {
        if (data.success) {
          this.closeBtn1.nativeElement.click();
          let snackBarRef = this.snackBar.open(' Request send successfully', '', {
            duration: 2000
          });
          this.sendRequestBtnDisable= false;
          this.sendRequestSpinner = false;
        } else {
          let snackBarRef = this.snackBar.open(data.msg, '', {
            duration: 2000
          });
          this.sendRequestBtnDisable= false;
          this.sendRequestSpinner = false;
        }
      });
    }
  }
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
  inArray(needle, haystack) {
    var count = haystack.length;
    for (var i = 0; i < count; i++) {
      if (haystack[i] === needle) { return true; }
    }
    return false;
  }
  taskStatus() {
    this.myTasks.forEach(element => {
      element.tbl_project_tasks.forEach(tasks => {
        if (this.inArray(tasks.id, tasks.tbl_task_status_assocs) == false) {
          this.newTasks.status = 'New'
          // console.log("if");
        } else {
          // console.log("else");
          // this.userService.getMyTasks(tasks.id).subscribe(status => {
          // });
        }
      });
    });
  }
  callTimer() {
    this.miliSec++;
    if (this.miliSec < 100) {
      if (this.miliSec === 99) {
        this.miliSec = 0;
        this.sec++;
        if (this.sec === 60) {
          this.sec = 0;
          this.min++;
        }
      }
    }
    else {
      this.miliSec = 0;
    }
    document.getElementById("timer").innerHTML = this.min + ":" + this.sec + ":" + this.miliSec;
  }
  statusBasedData() {
    this.preloader = true;
    this.selectbox = true;
    this.getmytasks();
    if (this.selected == 'all') {
      this.viewAll1 = true;
    } else {
      this.viewAll1 = false;
    }
  }
  onTabLinkClick(event: MatTabChangeEvent) {
    // View All tasks
    this.preloader = true;
    this.selected = 'all';
    this.showAllContent = true;
    if (event.tab.textLabel == 'View All tasks') {
      this.viewAllTasks = true
      this.getmytasks();
    }
    else if(event.tab.textLabel == "Today's Task"){
      this.viewAllTasks = false
      this.getmytasks();
    }
    else if(event.tab.textLabel == "Current Task"){
      this.viewAllTasks = true
      this.showAllContent = false;
      this.getmytasks();
    }
  }
  getmytasks() {
    this.myTasks = [];
    this.showDetails = [];
    this.lastStatus = "";
    this.taskToShow = "";
    this.userService.getMyTasks().subscribe(data => {
      this.preloader =false;
      this.myTasks = data;
      data.forEach((module, mdKey) => {
        let newTask = [];
        let curTask = [];
        module.tbl_project_tasks.forEach((task, key) => {

          console.log(task);
          let d = new Date(task.planned_start_date_time);
          let e = new Date(task.planned_end_date_time);

          task.starttime = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
          task.endtime = e.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })



          this.lastStatus = task.tbl_task_status_assocs[0];
          if (this.lastStatus.status_id == this.selected || this.selected == 'all') {
            task.projectId = module.project_id;
            task.showRequest = (this.lastStatus.status_id == 5) ? false : true;
            task.planned_start_date_time = new Date(task.planned_start_date_time);
            var nowDateTime = new Date();
            nowDateTime.setHours(0, 0, 0, 0);
            task.planned_start_date_time = task.planned_start_date_time.setHours(0, 0, 0, 0);
            task.showThisTask = true;
            if (this.viewAllTasks == false) {
              
              module.TaskExistForFinishInaModule = false;
             
              module.tbl_project_tasks.forEach((task) => {
                if (task.tbl_task_status_assocs[0].status_id !== 5 && new Date(task.planned_start_date_time) <= nowDateTime) {
                  module.TaskExistForFinishInaModule = true;
                }
              });
              if ((new Date(task.planned_start_date_time)) > nowDateTime || this.lastStatus.status_id == 5) {
                task.showThisTask = false;
              }
            }
            if (this.viewAllTasks == true) {
              module.TaskExistForFinishInaModule = true;
            }
            let totalHour = 0;
            let totalMinutes = 0;
            let totalSecond = 0;
            let totalHrinMS = 0;
            let totalMinutesinMS = 0;
            let totalSecondinMS = 0;
            // this.lastStatusEndDate = task.tbl_task_time_assocs[0].end_date_time;
            task.tbl_task_time_assocs.forEach(element => {
              totalHour += element.hour;
              totalMinutes += element.minute;
              totalSecond += element.second;
            });
            totalSecondinMS = totalSecond * 1000;
            totalMinutesinMS = totalMinutes * 1000 * 60;
            totalHrinMS = totalHour * 1000 * 60 * 60;
            // });
            this.diff = 0
            if (this.lastStatus.status_id == 3) {
              let taskStartTime1: any = new Date(task.tbl_task_time_assocs[0].date_time);
              this.diff = Math.abs(Date.now() - taskStartTime1);
            }
            let ttlSec = this.diff + totalHrinMS + totalMinutesinMS + totalSecondinMS;
            task.appendSecond = Math.floor((ttlSec / 1000) % 60);
            task.appendMinute = Math.floor((ttlSec / (1000 * 60)) % 60);
            task.appendHour = Math.floor((ttlSec / (1000 * 60 * 60)) % 24);
            if (this.lastStatus.status_id == 3) {
              this.inProgressTaskId = task.id;
              this.starttime(task);
            }
            else if (this.lastStatus.status_id == 2) {
              this.inProgressTaskId = task.id;
            }
            task.status = this.lastStatus;
            newTask.push(task);
            if(task.tbl_task_status_assocs[0].status_id == 2 || task.tbl_task_status_assocs[0].status_id == 3 || task.tbl_task_status_assocs[0].status_id == 4 || task.tbl_task_status_assocs[0].status_id == 7 ){
              curTask.push(task);
            }
          }
        });
        
        module.tbl_project_tasks = newTask;
        module.curTask = curTask;
        this.showDetails.push(module);
      });
    });
  }

  clearReason() {
    this.newTasks.reason = '';
  }
  clearhold() {
    this.newTasks.reason = '';
    this.newTasks.percentage = ''
  }
  clearprogress() {
    this.newTasks.percentage = ''
  }
  // -------------------------stopwatch----------------
  start(task, myTask) {
    
    if (this.inProgressTaskId == '' || task.id == this.inProgressTaskId) {
      this.a = [];
      this.b = [];
      this.countt = [];
      // this.hour = 0
      // this.miniutes = 0
      // this.second = 0
      // console.log(task)
      this.a[task.id] = 0;
      this.b[task.id] = 0;
      this.countt[task.id] = 0;
      this.intervel = 0;
      this.task_id = task.id;

      this.inProgressTaskId = task.id;

      this.userService.startAtask(task).subscribe(status => {
        this.getmytasks();
        //   this.inProgressTaskId = task.id;
        // this.userService.addTimeAssoc(this.time).subscribe(assTimeAssocs => {
        // this.userService.changeStausColor(task.id).subscribe(data => {
        //   console.log("-----------")
        //   console.log(data);
        //   if(data.length > 0){
        //     task.status = data[data.length-1];
        //   }
        //   this.starttime(task);
        // });
        // });
      });

      this.Resume[this.task_id] = false;
      this.completed[this.task_id] = true;
      this.pause[this.task_id] = true;
      this.hold[this.task_id] = true;
      this.done[this.task_id] = true;
      this.time.hour = task.appendHour;
      this.time.minutes = task.appendMinute;
      this.time.seconds = task.appendSecond;
      this.time.id = task.id
    } else {
      let snackBarRef = this.snackBar.open(' Another task alreay Started', '', {
        duration: 2000
      });
    }
  }
  starttime(task) {
    this.a[task.id] = 0;
    this.b[task.id] = 0;
    this.countt[task.id] = 0;
    if (this.countt[task.id] == 0 && this.a[task.id] == 0 || this.b[task.id] == 1) {
      this.secondcheck(task);
      this.miniutecheck(task);
      this.intervel = 1000;
      this.showAns(task);
      this.s_id = setInterval(() => {
        this.showAns(task);
      }, 1000);
    }
  }
  showAns(task) {
    if (this.countt[task.id] == 0 && this.a[task.id] == 0 || this.b[task.id] == 1) {
      // this.second = this.second + 1;
      this.secondcheck(task);
      this.miniutecheck(task);
      task.appendSecond = task.appendSecond + 1;
      // console.log(task)
    }
  }
  secondcheck(task) {
    if (task.appendSecond == 59) {
      task.appendMinute = task.appendMinute + 1;
      task.appendSecond = 0;
    }
  }
  miniutecheck(task) {
    if (task.appendMinute == 59) {
      task.appendHour = task.appendHour + 1;
      task.appendMinute = 0;
    }
  }
  pause1(task) {
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
  }
  pauseTask(task) {
    // console.log(this.newTasks.reason);
    this.task_id = task.id;
    // this.userService.getAllTasksInModule().subscribe(alltasks => {
    //   this.alltask = alltasks;
    //   this.alltask.forEach((element, index) => {
    //     // console.log(this.task_id)
    //     if (element.id == this.task_id) {
    //       // this.show[j] = true;
    //       this.disableTask[this.task_id] = false;
    //     } else {
    //       this.disableTask[element.id] = true;
    //     }
    //   });
    // });
    // this.Resume[this.task_id] = true;
    // this.play[this.task_id] = false;
    // this.pause[this.task_id] = false;
    // this.hold[this.task_id] = false;
    // this.done[this.task_id] = false;
    // this.completed[this.task_id] = false;
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    task.reason = this.newTasks.reason;
    // this.newTasks.id = task.id;
    // this.newTasks.hour = task.appendHour;
    // this.newTasks.minutes = task.appendMinute;
    // this.newTasks.seconds = task.appendSecond;
    if (this.newTasks.reason == '') {
      let snackBarRef = this.snackBar.open(' Please fill the reason!', '', {
        duration: 2000
      });
    }
    else {
      this.userService.pauseTask(task).subscribe(status => {
        this.getmytasks();
        // this.userService.changeStausColor(task.id).subscribe(data => {
        //   task.status = data[data.length - 1];
        // });
      });
    }
  }

  holdTask(task) {
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    task.reason = this.newTasks.reason;
    task.percentage = this.newTasks.percentage;
    // this.newTasks.id = task.id;
    // this.newTasks.hour = task.appendHour;
    // this.newTasks.minutes = task.appendMinute;
    // this.newTasks.seconds = task.appendSecond;
    if (this.newTasks.percentage == '' || this.newTasks.percentage == null || this.newTasks.reason == '' || this.newTasks.reason == null) {
      let snackBarRef = this.snackBar.open(' Please fill all the fields', '', {
        duration: 2000
      });
    }
    else {

      this.userService.holdTask(task).subscribe(status => {
        this.inProgressTaskId = '';
        this.getmytasks();
        // this.userService.changeStausColor(task.id).subscribe(data => {
        //   task.status = data[data.length - 1];
        // });
      });
    }
  }
  timeConversion(millisec) {
    let seconds: any = (millisec / 1000).toFixed(1);
    let minutes: any = (millisec / (1000 * 60)).toFixed(1);
    let hours: any = (millisec / (1000 * 60 * 60)).toFixed(1);
    if (seconds < 60) {
      return seconds;
    } else if (minutes < 60) {
      return minutes;
    } else if (hours < 24) {
      return hours;
    }
  }
  Done(task) {
    console.log(task);
   
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    this.userService.donetask(task).subscribe(status => {
      
      this.inProgressTaskId = '';
      if(status.success && !task.is_verif_task){
        let snackBarRef = this.snackBar.open('Congratulations!!! , your task is submitted for verification', '', {
          duration: 3000
        });
      }
      if(status.success && task.is_verif_task){
        let snackBarRef = this.snackBar.open('Congratulations!!! , Project Completed', '', {
          duration: 3000
        });
      }
      if(!status.success ){
        let snackBarRef = this.snackBar.open(status.msg, '', {
          duration: 3000
        });
      }
      this.getmytasks();
    });
  }
  complete(task) {
    this.task_id = task.id;
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    task.percentage = this.newTasks.percentage;
    // this.newTasks.id = task.id;
    // this.newTasks.hour = task.appendHour;
    // this.newTasks.minutes = task.appendMinute;
    // this.newTasks.seconds = task.appendSecond;
    if (this.newTasks.percentage == '' || this.newTasks.percentage == null) {
      let snackBarRef = this.snackBar.open(' Please select percentage of task', '', {
        duration: 2000
      });
    } else {
      this.userService.completeTask(task).subscribe(status => {
        this.inProgressTaskId = '';
        this.getmytasks();
        // this.userService.changeStausColor(task.id).subscribe(data => {
        //   task.status = data[data.length - 1];
        // });
      });
      // this.Resume[this.task_id] = false;
      // this.play[this.task_id] = false;
      // this.completed[this.task_id] = false;
      // this.pause[this.task_id] = false;
      // this.hold[this.task_id] = false;
      // this.done[this.task_id] = false;
    }
  }
  resumeTasks(task) {
    if (this.inProgressTaskId == '' || task.id == this.inProgressTaskId) {
      this.b[task.id] = this.b[task.id] + 1;
      this.showAns(task);
      this.newTasks.id = task.id;
      this.newTasks.hour = task.appendHour;
      this.newTasks.minutes = task.appendMinute;
      this.newTasks.seconds = task.appendSecond;
      this.Resume[this.task_id] = false;
      this.inProgressTaskId = task.id;
      this.userService.resumeTasks(this.newTasks).subscribe(status => {
        this.getmytasks();
        // this.inProgressTaskId = task.id;
        // this.userService.changeStausColor(task.id).subscribe(data => {
        //   task.status = data[data.length - 1];
        // });
      });
    } else {
      let snackBarRef = this.snackBar.open(' Another task alreay Started' + this.lastStatus.status_id, '', {
        duration: 2000
      });
    }
  }
  restartTasks(task) {
    if (this.inProgressTaskId == '' || task.id == this.inProgressTaskId) {
      this.b[task.id] = this.b[task.id] + 1;
      // this.showAns(task);
      this.newTasks.id = task.id;
      this.newTasks.hour = task.appendHour;
      this.newTasks.minutes = task.appendMinute;
      this.newTasks.seconds = task.appendSecond;
      this.Resume[this.task_id] = false;
      this.inProgressTaskId = task.id;
      this.userService.resumeTasks(this.newTasks).subscribe(status => {
        this.getmytasks();
        // this.inProgressTaskId = task.id;
        // this.userService.changeStausColor(task.id).subscribe(data => {
        //   task.status = data[data.length - 1];
        // });
      });
    } else {
      let snackBarRef = this.snackBar.open(' Another task alreay Started' + this.lastStatus.status_id, '', {
        duration: 2000
      });
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

  // -------------------------stopwatch----------------
}
