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
declare var $: any;
@Component({
  selector: 'user-task-verification',
  templateUrl: './user-task-verification.component.html',
  styleUrls: ['./user-task-verification.component.css']
})
export class UserTaskVerificationComponent implements OnInit {
  private socket: any;
  showDetails = [];
  info = {
    projectId:'all'
  }
  projects
  reTask = {
    reason :'',
    category : ''
  }
  isProjects = false;
  constructor(private route: ActivatedRoute, private routes: Router, private config: Config, private userService: UserService, private companyService: CompanyService, public snackBar: MatSnackBar, private st: SimpleTimer) {
     this.socket = socketIo(config.siteUrl);
     }
  // constructor() { }

  ngOnInit() {

    this.socket.on('newtaskdone', (data) => {
      this.refresh();
    });
    this.refresh();
   
  }
  refresh(){
    this.userService.getUserProjects().subscribe(data => {
      this.projects = data;
    });
    this.getVerificationTasks();
  }

  getVerificationTasks(){
      this.userService.getVerificationTasks(this.info).subscribe(data => {
       
        this.showDetails = [];
        // console.log(data);
        data.forEach((modul, mdKey) => {
            let newTask = [];
            modul.showModule = false;
            modul.tbl_project_tasks.forEach((task, key) => {
              console.log(modul);
              var lastStatus = task.tbl_task_status_assocs[0];
              if ((lastStatus.status_id == 5 || lastStatus.status_id == 6) && !task.is_verif_task) {
                modul.showModule = true;
                task.showThisTask = true;
                this.isProjects = true;
                task.status = lastStatus;
                newTask.push(task);
               }
            }); 
            modul.tbl_project_tasks = newTask;
            this.showDetails.push(modul);
            
        }); 
      
    })
  }
  verifyTask(task){
    $('.verButtons' + task.id).hide();
    $('.loadingImg' + task.id).show();
    this.userService.verifyTask(task).subscribe(status => {
      let snackBarRef = this.snackBar.open(status.msg, '', {
        duration: 2000
      });
      this.getVerificationTasks();
    });
  }
  clearReTask(){
    this.reTask.reason = '';
    this.reTask.category = '';
  }
  resubmit(task){
    if(this.reTask.category == ''){
      let snackBarRef = this.snackBar.open("Please Choose Category", '', {
        duration: 2000
      });
    } else if(this.reTask.reason == ''){
      let snackBarRef = this.snackBar.open("Please Enter Reason", '', {
        duration: 2000
      });
    }else{
      $('.verButtons' + task.id).hide();
      $('.loadingImg' + task.id).show();
      task.reason = this.reTask.reason;
      task.category = this.reTask.category;
      this.userService.resubmitTask(task).subscribe(status => {
        let snackBarRef = this.snackBar.open(status.msg, '', {
          duration: 2000
        });
        this.getVerificationTasks();
        
      });
    }
   
  }
}
