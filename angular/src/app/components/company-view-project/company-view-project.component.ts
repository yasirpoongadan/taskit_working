import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import * as socketIo from 'socket.io-client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from './../../config/config';
declare var $: any;
@Component({
  selector: 'app-company-view-project',
  templateUrl: './company-view-project.component.html',
  styleUrls: ['./company-view-project.component.css']
})
export class CompanyViewProjectComponent implements OnInit {

  private socket: any;
  spinner = false;
  projects: any;
  projectId: any;
  showData = false;
  xShow = false;
  showDetails: any
  allProjects: any;
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private config: Config
  ) { this.socket = socketIo(config.socketURL); }

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

    this.companyService.getProjectsById(this.projectId).subscribe(allprobyid => {
      this.allProjects = allprobyid
   
        
        let pd = new Date( this.allProjects.planned_start_date);
        let pe = new Date( this.allProjects.planned_end_date);

        this.allProjects.projectstarttime = pd.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        this.allProjects.projectendtime = pe.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
     
    });

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
      this.projects = [];
      this.projects = resProjects.data;
      this.projects.forEach((module, key) => {
        let totalhour = 0;
        module.tbl_project_tasks.forEach(task => {
          totalhour = totalhour + task.buffer_hour + task.planned_hour;

          let d = new Date(task.planned_start_date_time);
          let e = new Date(task.planned_end_date_time);
          task.starttime = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
          task.endtime = e.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

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

}
