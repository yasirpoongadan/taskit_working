
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { SimpleTimer } from 'ng2-simple-timer';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'user-task-management',
  templateUrl: './user-task-management.component.html',
  styleUrls: ['./user-task-management.component.css']
})
export class UserTaskManagementComponent implements OnInit {
  statusID: any;
  done = [];
  hold = [];
  Resume = [];
  completed = [];
  viewAll1: Boolean = true
  selectbox: boolean = false;
  showTasks: Boolean = false;
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
  lastTimeStatus: any;
  i: any;
  j: any;
  taskId: any;
  complexitys: any;
  task_id: any;
  disableTask = [];
  disable: Boolean = false;
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
  showRequest =[];
  constructor(private route: ActivatedRoute, private userService: UserService, private companyService: CompanyService, public snackBar: MatSnackBar, private st: SimpleTimer) { }
  ngOnInit() {
    this.hour = 0
    this.miniutes = 0
    this.second = 0
    this.appendHour = 0;
    this.appendMinute = 0;
    this.appendSecond = 0;
    let task_time_id = 0;
    this.lastStatus = ''
    // this.userService.getMyTasks().subscribe(forDisable => {
    //   forDisable.forEach(module => {
    //     module.tbl_project_tasks.forEach(task => {
    //       task.tbl_task_time_assocs.forEach(element => {
    //         if (element.id > task_time_id) {
    //           this.lastStatus = element;
    //           task_time_id = element.id;
    //         }
    //         console.log(this.lastStatus.status_id)
    //         if (this.lastStatus.status_id == 3 || this.lastStatus.status_id == 2) {
    //           console.log(task.id)
    //           console.log("status id");
    //           this.disableTask[task.id] = true;
    //         }
    //         else {
    //           console.log(task.id);
    //           console.log("else");
    //           this.disableTask[task.id] = false;
    //         }
    //       });
    //     });
    //   });
    // });
    // this.userService.getMyTasks().subscribe(forDisable => {
    //   forDisable.forEach(module => {
    //     module.tbl_project_tasks.forEach(task => {
    //       this.task_id = task.id;
    //       task.tbl_task_time_assocs.forEach(element => {
    //         if (element.id > task_time_id) {
    //           this.lastStatus = element;
    //           task_time_id = element.id;
    //         }
    //       });
    //       if (this.lastStatus !== undefined) {
    //         if (this.lastStatus.status_id == 3 || this.lastStatus.status_id == 2) {
    //           this.userService.getAllTasksInModule().subscribe(alltasks => {
    //             this.alltask = alltasks;
    //             this.alltask.forEach((element, index) => {
    //               if (element.id == this.task_id) {
    //                 this.disableTask[this.task_id] = false;
    //               } else {
    //                 this.disableTask[element.id] = true;
    //               }
    //             });
    //           });
    //         }
    //       }
    //     });
    //   });
    // });
    this.userService.getAllTasksInModule().subscribe(alltasks => {
      this.alltask = alltasks;
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
      if (this.count > 1) {
        this.showTeam = true;
      }
    })
    this.companyService.getComplexity().subscribe(complexity => {
      this.complexitys = complexity;
    });
    this.userService.getPercentage().subscribe(percentage => {
      this.percentages = percentage
    });
    this.selected = "all";
    this.selectbox = false;
    this.getmytasks();
  }
  viewAll() {
    this.selectbox = true;
    this.getmytasks();
  }
  addTask(index) {
    // console.log(this.newTasks);
    this.newTasks.assigned_person = this.assigned_id;
    this.newTasks.module_id = this.module_id;
    this.userService.newTaskRequest(this.newTasks).subscribe(data => {
      if (data.success) {
        this.closeBtn.nativeElement.click();
        let snackBarRef = this.snackBar.open(' Request send successfully', '', {
          duration: 2000
        });
      } else {
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
    // console.log(this.newTasks);
    //   this.myTasks.forEach(element => {
    //     element.tbl_project_tasks.forEach(project_tasks => {
    //       console.log(project_tasks.tbl_complexity_percentage.percentage);
    //     });
    //   });
  }
  TimeExtention(newTasks) {
    this.userService.newTimeExtention(newTasks).subscribe(data => {
      if (data.success) {
        this.closeBtn1.nativeElement.click();
        let snackBarRef = this.snackBar.open(' Request send successfully', '', {
          duration: 2000
        });
      } else {
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 2000
        });
      }
    });
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
    this.selectbox = true;
    this.getmytasks();
    if (this.selected == 'all') {
      this.viewAll1 = true;
    } else {
      this.viewAll1 = false;
    }
  }
  getmytasks() {
    this.myTasks = [];
    let task_time_id: any = '';
    this.showDetails1 = [];
    this.showDetails = [];
    this.lastStatus = "";
    this.taskToShow = "";
    // this. endDatetym ='';
    this.userService.getMyTasks().subscribe(data => {
      this.myTasks = data;
      if (this.selected == "all") {
        data.forEach(module => {
          module.tbl_project_tasks.forEach(task => {
            this.showRequest[task.id]=true;
            this.task_id = task.id;
            task.planned_start_date_time = new Date(task.planned_start_date_time);
            if (this.selectbox == false) {
              this.lastStatus = task.tbl_task_status_assocs[task.tbl_task_status_assocs.length - 1];
              if (this.lastStatus !== undefined) {
                if (task.planned_start_date_time <= Date.now() && this.lastStatus.status_id !== 5) {
                  task.startdatenow = 'showtasks';
                }
              } else {
                if (task.planned_start_date_time <= Date.now()) {
                  task.startdatenow = 'showtasks';
                }
              }
            } else {
              task.startdatenow = 'showtasks';
            }
            this.appendHour = 0;
            this.appendMinute = 0;
            this.appendSecond = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.taskTym = '';
            this.endDatetym = '';
            if (task.tbl_task_time_assocs && task.tbl_task_time_assocs.length == 0) {
              task.appendHour = 0;
              task.appendMinute = 0;
              task.appendSecond = 0;
            }
            else {
              // this.taskTym = task.tbl_task_time_assocs[task.tbl_task_time_assocs.length - 1];
              this.task_id = task.id;
              // console.log(this.showthisTask[task.id] + ":" + task.id)
              this.appendHour = 0;
              this.appendMinute = 0;
              this.appendSecond = 0;
              task_time_id = 0;
              let totalHour = 0;
              let totalMinutes = 0;
              let totalSecond = 0;
              let totalHrinMS = 0;
              let totalMinutesinMS = 0;
              let totalSecondinMS = 0;
              this.lastStatusEndDate = task.tbl_task_time_assocs[task.tbl_task_time_assocs.length - 1].end_date_time;
              if (this.lastStatusEndDate == null && (this.lastStatus.status_id == 1 || this.lastStatus.status_id == 2 || this.lastStatus.status_id == 4 || this.lastStatus.status_id == 5)) {
                // no end date, refresh case
                task.tbl_task_time_assocs.forEach(element => {
                  totalHour = totalHour + element.hour;
                  totalMinutes = totalMinutes + element.minute;
                  totalSecond = totalSecond + element.second;
                  if (element.id > task_time_id) {
                    this.taskTym = element;
                    task_time_id = element.id;
                  }
                });
                totalSecondinMS = totalSecond * 1000;
                totalMinutesinMS = totalMinutes * 1000 * 60;
                totalHrinMS = totalHour * 1000 * 60 * 60;
                // });
                this.endDatetym = new Date(this.taskTym.date_time);
                this.diff = 0;
                this.diff = Math.abs(Date.now() - this.endDatetym);
              }
              else {
                // have end date
                task.tbl_task_time_assocs.forEach(element => {
                  totalHour = totalHour + element.hour;
                  totalMinutes = totalMinutes + element.minute;
                  totalSecond = totalSecond + element.second;
                  totalSecondinMS = totalSecond * 1000;
                  totalMinutesinMS = totalMinutes * 1000 * 60;
                  totalHrinMS = totalHour * 1000 * 60 * 60;
                  if (element.id > task_time_id) {
                    this.taskTym = element;
                    task_time_id = element.id;
                  }
                  this.diff = 0;
                });
              };
              let A = 0;
              A = this.diff + totalHrinMS + totalMinutesinMS + totalSecondinMS;
              task.appendSecond = Math.floor((A / 1000) % 60);
              task.appendMinute = Math.floor((A / (1000 * 60)) % 60);
              task.appendHour = Math.floor((A / (1000 * 60 * 60)) % 24);
            }
            if (task.tbl_task_status_assocs == [] || task.tbl_task_status_assocs == null || task.tbl_task_status_assocs == '') {
              console.log("here");
              this.showDetails1.push(module);
              // this.showDetails.push(module);
              // this.play[task.id] = true;
            } else {
              console.log("----------");
              this.lastStatus = '';
              // this.lastStatus = task.tbl_task_status_assocs[task.tbl_task_status_assocs.length - 1];
              this.lastStatusid = '';
              task.tbl_task_status_assocs.forEach(element => {
                if (element.id > this.lastStatusid) {
                  this.lastStatus = element;
                  this.lastStatusid = element.id;
                }
              });
              // console.log(this.lastStatus)
              if (this.lastStatusEndDate == null && this.lastStatus.status_id == 3) {
                //continue the timer when it in inprogress and no end date(case: refresh)
                this.starttime(task);
              }
              // if (this.lastStatus !== undefined) {
                task.status = this.lastStatus;
              //   this.showDetails.push(module);
              // }
            }
          });
          this.showDetails.push(module);
        });
        console.log(this.showDetails);
      }
      else {
        data.forEach(module => {
          module.tbl_project_tasks.forEach(task => {
            task.startdatenow = 'showtasks';
            this.appendHour = 0;
            this.appendMinute = 0;
            this.appendSecond = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.taskTym = '';
            this.endDatetym = '';
            if (task.tbl_task_time_assocs && task.tbl_task_time_assocs.length == 0) {
              task.appendHour = 0;
              task.appendMinute = 0;
              task.appendSecond = 0;
            }
            else {
              // this.taskTym = task.tbl_task_time_assocs[task.tbl_task_time_assocs.length - 1];
              this.task_id = task.id;
              task.planned_start_date_time = new Date(task.planned_start_date_time);
              // console.log(this.showthisTask[task.id] + ":" + task.id)
              this.appendHour = 0;
              this.appendMinute = 0;
              this.appendSecond = 0;
              task_time_id = 0;
              let totalHour = 0;
              let totalMinutes = 0;
              let totalSecond = 0;
              let totalHrinMS = 0;
              let totalMinutesinMS = 0;
              let totalSecondinMS = 0;
              this.lastStatusEndDate = task.tbl_task_time_assocs[task.tbl_task_time_assocs.length - 1].end_date_time;
              if (this.lastStatusEndDate == null && (this.lastStatus.status_id == 1 || this.lastStatus.status_id == 2 || this.lastStatus.status_id == 4 || this.lastStatus.status_id == 5)) {
                // no end date, refresh case
                task.tbl_task_time_assocs.forEach(element => {
                  totalHour = totalHour + element.hour;
                  totalMinutes = totalMinutes + element.minute;
                  totalSecond = totalSecond + element.second;
                  if (element.id > task_time_id) {
                    this.taskTym = element;
                    task_time_id = element.id;
                  }
                });
                totalSecondinMS = totalSecond * 1000;
                totalMinutesinMS = totalMinutes * 1000 * 60;
                totalHrinMS = totalHour * 1000 * 60 * 60;
                // });
                this.endDatetym = new Date(this.taskTym.date_time);
                this.diff = 0;
                this.diff = Math.abs(Date.now() - this.endDatetym);
              }
              else {
                // have end date
                task.tbl_task_time_assocs.forEach(element => {
                  totalHour = totalHour + element.hour;
                  totalMinutes = totalMinutes + element.minute;
                  totalSecond = totalSecond + element.second;
                  totalSecondinMS = totalSecond * 1000;
                  totalMinutesinMS = totalMinutes * 1000 * 60;
                  totalHrinMS = totalHour * 1000 * 60 * 60;
                  if (element.id > task_time_id) {
                    this.taskTym = element;
                    task_time_id = element.id;
                  }
                  this.diff = 0;
                });
              };
              let A = 0;
              A = this.diff + totalHrinMS + totalMinutesinMS + totalSecondinMS;
              task.appendSecond = Math.floor((A / 1000) % 60);
              task.appendMinute = Math.floor((A / (1000 * 60)) % 60);
              task.appendHour = Math.floor((A / (1000 * 60 * 60)) % 24);
            }
            if (task.tbl_task_status_assocs == [] || task.tbl_task_status_assocs == null || task.tbl_task_status_assocs == '') {
              // this.showDetails1.push(module);
              // this.showDetails.push(module);
              // this.play[task.id] = true;
              // if (this.selected == 1) {
              //   this.showDetails = this.showDetails1;
              // }
            } else {
              this.lastStatus = '';
              // this.lastStatus = task.tbl_task_status_assocs[task.tbl_task_status_assocs.length - 1];
              this.lastStatusid = '';
              task.tbl_task_status_assocs.forEach(element => {
                if (element.id > this.lastStatusid) {
                  this.lastStatus = element;
                  this.lastStatusid = element.id;
                }
              });
              if (this.lastStatusEndDate == null && this.lastStatus.status_id == 3) {
                //continue the timer when it in inprogress and no end date(case: refresh)
                this.starttime(task);
              }
              if (this.lastStatus !== undefined) {
                if (this.lastStatus.status_id == this.selected) {
                  task.status = this.lastStatus;
                  // this.showDetails.push(module);
                }
              }
            }
          });
          this.showDetails.push(module);
        });
      }
      // console.log(this.showDetails);
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
    this.userService.getAllTasksInModule().subscribe(alltasks => {
      this.alltask = alltasks;
      this.alltask.forEach((element, index) => {
        // console.log(this.task_id)
        if (element.id == this.task_id) {
          // this.show[j] = true;
          this.disableTask[this.task_id] = false;
        } else {
          this.disableTask[element.id] = true;
        }
      });
    });
    this.userService.startAtask(task.id).subscribe(status => {
      this.userService.addTimeAssoc(this.time).subscribe(assTimeAssocs => {
        this.userService.changeStausColor(task.id).subscribe(data => {
          console.log("-----------")
          console.log(data);
          if(data.length > 0){
            task.status = data[data.length-1];
          }
          this.starttime(task);
        });
      });
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
    this.task_id = task.id;
    this.userService.getAllTasksInModule().subscribe(alltasks => {
      this.alltask = alltasks;
      this.alltask.forEach((element, index) => {
        // console.log(this.task_id)
        if (element.id == this.task_id) {
          // this.show[j] = true;
          this.disableTask[this.task_id] = false;
        } else {
          this.disableTask[element.id] = true;
        }
      });
    });
    this.Resume[this.task_id] = true;
    this.play[this.task_id] = false;
    this.pause[this.task_id] = false;
    this.hold[this.task_id] = false;
    this.done[this.task_id] = false;
    this.completed[this.task_id] = false;
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    this.newTasks.id = task.id;
    this.newTasks.hour = task.appendHour;
    this.newTasks.minutes = task.appendMinute;
    this.newTasks.seconds = task.appendSecond;
    this.userService.pauseTask(this.newTasks).subscribe(status => {
      this.userService.changeStausColor(task.id).subscribe(data => {
        task.status = data[data.length - 1];
      });
    });
  }
  holdTask(task) {
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    this.newTasks.id = task.id;
    this.newTasks.hour = task.appendHour;
    this.newTasks.minutes = task.appendMinute;
    this.newTasks.seconds = task.appendSecond;
    if (this.newTasks.percentage == '' || this.newTasks.percentage == null || this.newTasks.reason == '' || this.newTasks.reason == null) {
      let snackBarRef = this.snackBar.open(' Please fill all the fields', '', {
        duration: 2000
      });
    }
    else {
      this.userService.getAllTasksInModule().subscribe(alltasks => {
        this.alltask = alltasks;
        // console.log(this.alltask);
        this.alltask.forEach((element, index) => {
          this.disableTask[element.id] = false;
        });
      });
      this.task_id = task.id;
      this.Resume[this.task_id] = true;
      this.play[this.task_id] = false;
      this.pause[this.task_id] = false;
      this.hold[this.task_id] = false;
      this.done[this.task_id] = false;
      this.completed[this.task_id] = false;
      this.userService.holdTask(this.newTasks).subscribe(status => {
        this.userService.changeStausColor(task.id).subscribe(data => {
          task.status = data[data.length - 1];
        });
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
    this.userService.getAllTasksInModule().subscribe(alltasks => {
      this.alltask = alltasks;
      this.alltask.forEach((element, index) => {
        this.disableTask[element.id] = false;
      });
    });
    this.newTasks.id = task.id;
    this.Resume[this.task_id] = false;
    this.play[this.task_id] = false;
    this.completed[this.task_id] = false;
    this.pause[this.task_id] = false;
    this.hold[this.task_id] = false;
    this.done[this.task_id] = false;
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    this.newTasks.id = task.id;
    this.newTasks.hour = task.appendHour;
    this.newTasks.minutes = task.appendMinute;
    this.newTasks.seconds = task.appendSecond;
    this.userService.donetask(this.newTasks).subscribe(status => {
      this.userService.changeStausColor(task.id).subscribe(data => {
        task.status = data[data.length - 1];
        this.showRequest[task.id]=false;        
      });
    });
  }
  complete(task) {
    this.task_id = task.id;
    this.a[task.id] = this.a[task.id] + 1;
    this.b[task.id] = 0;
    this.newTasks.id = task.id;
    this.newTasks.hour = task.appendHour;
    this.newTasks.minutes = task.appendMinute;
    this.newTasks.seconds = task.appendSecond;
    if (this.newTasks.percentage == '' || this.newTasks.percentage == null) {
      let snackBarRef = this.snackBar.open(' Please select percentage of task', '', {
        duration: 2000
      });
    } else {
      this.userService.completeTask(this.newTasks).subscribe(status => {
        this.userService.changeStausColor(task.id).subscribe(data => {
          task.status = data[data.length - 1];
        });
      });
      this.Resume[this.task_id] = false;
      this.play[this.task_id] = false;
      this.completed[this.task_id] = false;
      this.pause[this.task_id] = false;
      this.hold[this.task_id] = false;
      this.done[this.task_id] = false;
    }
  }
  resumeTasks(task) {
    this.b[task.id] = this.b[task.id] + 1;
    this.showAns(task);
    this.newTasks.id = task.id;
    this.newTasks.hour = task.appendHour;
    this.newTasks.minutes = task.appendMinute;
    this.newTasks.seconds = task.appendSecond;
    this.Resume[this.task_id] = false;
    this.userService.resumeTasks(this.newTasks).subscribe(status => {
      this.userService.changeStausColor(task.id).subscribe(data => {
        task.status = data[data.length - 1];
      });
    });
  }
  // -------------------------stopwatch----------------
}
