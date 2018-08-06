import { Component, ViewChild, OnInit, ElementRef  } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import * as socketIo from 'socket.io-client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from './../../config/config';
declare var $: any;

@Component({
  selector: 'app-company-approve-project-final',
  templateUrl: './company-approve-project-final.component.html',
  styleUrls: ['./company-approve-project-final.component.css']
})
export class CompanyApproveProjectFinalComponent implements OnInit {

  private socket: any;
  spinner = false;
  projects: any;
  projectId: any;
  showData = false;
  xShow = false;
  showDetails :any
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private config: Config
  ) {  this.socket = socketIo(config.socketURL);}

  ngOnInit() {
    this.socket.on('inProgress', () => {
      this.getProjectDetails();
    });
    this.socket.on('paused', () => {
      this.getProjectDetails();
    });
    this.socket.on('complete', () => {
      this.getProjectDetails();
    });
    this.socket.on('hold', () => {
      this.getProjectDetails();
    });
    this.socket.on('completed', () => {
      this.getProjectDetails();
    });
    this.getProjectDetails();

  }
  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Manu Prasad 
  // Desc          : Get Teams from database
  getProjectDetails() {
    this.spinner = true;
    this._activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['id'];

    });
    // console.log(this.projectId)

    this.companyService.getProjectDetails(this.projectId).subscribe(resProjects => {
      console.log(resProjects)
      // this.allProjects.resProjects.

      this.projects = [];
      this.projects = resProjects.data;
      this.projects.forEach((module, key) => {
        let totalhour = 0;
        module.tbl_project_tasks.forEach(task => {
          totalhour = totalhour + task.buffer_hour + task.planned_hour;
        });
        module.totalhour = totalhour;
      });
      if (resProjects) {
        this.showData = true;
        this.spinner = false;
      }

    });

  }
  //  ---------------------------------end-----------------------------------------------
  approveProject(){
    this.companyService.projectApprove(this.projectId).subscribe(res => {
      console.log(res)
      let snackBarRef = this.snackBar.open(res.msg, '', {
        duration: 4000
      });
      if (res.success == true) {
          this.routes.navigate(['/view-project', this.projectId]);
      }

    });
  }
}
