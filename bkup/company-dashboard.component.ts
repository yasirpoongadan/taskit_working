import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../../services/company.service';
import { DragulaService } from 'ng2-dragula';
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
import { MatTabChangeEvent } from '@angular/material';
import { ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyDashboardComponent implements OnInit {

  projects = [];
  users = [];
  project_id: any;
  total_tasks: number = 0;
  new_tasks: number = 0;
  in_progress_tasks: number = 0;
  completed_tasks: number = 0;
  onHold_tasks: number = 0;
  paused_tasks: number = 0;
  start_date: any;
  end_date: any;
  planned_hour: number = 0;
  actual_hour: number = 0;
  module_count: number = 0;
  modules = [];
  projectforProVsStatusGraph = [];
  moduleExists = false;
  statusExists = false;
  private socket: any;
  // categories: any = [
  //   {
  //     id: 1,
  //     name: 'Category 1',
  //     subCategories: [
  //       {
  //         id: 5,
  //         name: 'Sub-category 5',
  //         dragulaName: 'category-1'
  //       },
  //       {
  //         id: 6,
  //         name: 'Sub-category 6',
  //         dragulaName: 'category-1'
  //       },
  //       {
  //         id: 7,
  //         name: 'Sub-category 7',
  //         dragulaName: 'category-1'
  //       },
  //       {
  //         id: 8,
  //         name: 'Sub-category 8',
  //         dragulaName: 'category-1'
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'Category 2',
  //     subCategories: []
  //   },
  //   {
  //     id: 3,
  //     name: 'Category3',
  //     subCategories: []
  //   },
  //   {
  //     id: 4,
  //     name: 'Category 4',
  //     subCategories: []
  //   },

  // ];

  constructor(private companyService: CompanyService, private config: Config) {
    this.socket = socketIo(config.socketURL);
  }

  public ngOnInit() {
    this.socket.on('new', (data) => {
      this.getAllProjects();
    });
    this.socket.on('paused', (data) => {
      this.getAllProjects();
    });
    this.socket.on('completed', (data) => {
      this.getAllProjects();
    });
    this.socket.on('hold', (data) => {
      this.getAllProjects();
    });
    this.socket.on('inProgress', (data) => {
      this.getAllProjects();
    });
    this.getAllProjects();
    // this._dragulaService.setOptions('categories', {
    //   moves: function (el, container, handle) {
    //     return handle.className === 'handler';
    //   }
    // });
    // this._dragulaService.drop.asObservable().subscribe((value) => {

    //   console.log(value);

    // });

    /**
     * Used to get the dragged question original position.
     */
    // this._dragulaService.drag.asObservable().subscribe((value) => {

    //   console.log(value);

    // });
  }
  onLinkClick(event: MatTabChangeEvent) {

    this.getAllProjects();
 
  }
  
  getAllProjects() {
    this.projectforProVsStatusGraph = [];
    this.companyService.getAllProject().subscribe(data => {
      this.projects = [];
      data.forEach(element => {
        if (element.status == "Planned" || element.status == "Completed" || element.status == "In Progress") {
          this.projects.push(element);
        }
      });
      if (this.projects.length == 0) {
        //no data in charts
      } else {
        this.moduleExists = true;
        this.project_id = this.projects[0].id;
        this.getData(this.project_id);
        // ---------------------------------Start-------------------------------------------
        // Function      : getdataforProjectVsStatusGraph
        // Params        : projects
        // Returns       : 
        // Author        : Rinsha
        // Date          :  19-04-2018
        // Last Modified : 
        // Desc          : 
        this.companyService.getdataforProjectVsStatusGraph(this.projects).subscribe(info => {
          if(info.length> 0){
            this.statusExists = true;
            
          }
          let last_status: any;
          let last_status_id = 0;
          this.projectforProVsStatusGraph = info;
          this.projectforProVsStatusGraph.forEach((project, key) => {
            let total_tasks = 0;
            let planned_hour = 0;
            let actual_hour = 0;
            let completed_tasks = 0;
            let in_progress_tasks = 0;
            project.forEach(module1 => {
              total_tasks = total_tasks + module1.tbl_project_tasks.length;
              module1.tbl_project_tasks.forEach(task => {
                if (task.planned_hour != null) {
                  planned_hour = planned_hour + task.planned_hour + task.buffer_hour;
                }
                if (task.actual_hour != null) {
                  actual_hour = actual_hour + task.actual_hour;
                }
                last_status_id = 0;
                last_status = {};
                task.tbl_task_status_assocs.forEach(statuses => {
                  if (statuses.id > last_status_id) {
                    last_status_id = statuses.id;
                    last_status = statuses;
                  }
                });
                if (last_status && last_status.status_id == 5) {
                  completed_tasks = completed_tasks + 1;
                }
                if (last_status && last_status.status_id == 3) {
                  in_progress_tasks = in_progress_tasks + 1;
                }
              });
            });
            this.projectforProVsStatusGraph[key].total_tasks = total_tasks;
              this.projectforProVsStatusGraph[key].planned_hour = planned_hour;
              this.projectforProVsStatusGraph[key].actual_hour = actual_hour;
              this.projectforProVsStatusGraph[key].completed_tasks = completed_tasks;
              this.projectforProVsStatusGraph[key].in_progress_tasks = in_progress_tasks;
              this.projectforProVsStatusGraph[key].per = completed_tasks / this.projectforProVsStatusGraph[key].total_tasks * 100;
          });
          // -----------------------------------End------------------------------------------
        });

      }
    });
  }

  changeProject(pro_id) {
    this.getData(pro_id);
  }

  getData(pro_id) {
    let last_status: any;
    let last_status_id = 0;
    // this.total_tasks = 0;
    // this.new_tasks = 0;
    // this.in_progress_tasks = 0;
    // this.completed_tasks = 0;
    // this.onHold_tasks = 0;
    // this.paused_tasks = 0;
    // this.planned_hour = 0;
    // this.actual_hour = 0;
    // ---------------------------------Start-------------------------------------------
    // Function      : getTasksByUser
    // Params        : pro_id
    // Returns       : 
    // Author        : Rinsha
    // Date          : 17-04-2018
    // Last Modified : 
    // Desc          : 
    this.companyService.getTasksByProject(pro_id).subscribe(data => {
      // console.log(data);
      this.module_count = 0;
      this.modules = [];
      this.module_count = data.length;
      this.modules = data;
      data.forEach((module, key) => {
        this.total_tasks = 0;
        this.modules[key].total_tasks = module.tbl_project_tasks.length;
        this.start_date = module.tbl_project.planned_start_date;
        this.end_date = module.tbl_project.planned_end_date;
        let planned_hour = 0;
        let actual_hour = 0;
        let new_tasks = 0;
        let paused_tasks = 0;
        let in_progress_tasks = 0;
        let onHold_tasks = 0;
        let completed_tasks = 0;

        module.tbl_project_tasks.forEach(task => {
          if (task.planned_hour != null) {
            planned_hour = planned_hour + task.planned_hour + task.buffer_hour;
          }
          if (task.actual_hour != null) {
            actual_hour = actual_hour + task.actual_hour;
          }
          // console.log(task)
          last_status_id = 0;
          last_status = {};
          task.tbl_task_status_assocs.forEach(statuses => {
            if (statuses.id > last_status_id) {
              last_status_id = statuses.id;
              last_status = statuses;
            }
          });
          if (last_status && last_status.status_id == 1) {
            new_tasks = new_tasks + 1;
          }
          if (last_status && last_status.status_id == 2) {
            paused_tasks = paused_tasks + 1;
          }
          if (last_status && last_status.status_id == 3) {
            in_progress_tasks = in_progress_tasks + 1;
          }
          if (last_status && last_status.status_id == 4) {
            onHold_tasks = onHold_tasks + 1;
          }
          if (last_status && last_status.status_id == 5) {
            completed_tasks = completed_tasks + 1;
          }
        });
        this.modules[key].planned_hour = planned_hour;
        this.modules[key].actual_hour = actual_hour;
        // this.modules[key].new_tasks = new_tasks;
        this.modules[key].paused_tasks = paused_tasks;
        this.modules[key].in_progress_tasks = in_progress_tasks;
        this.modules[key].onHold_tasks = onHold_tasks;
        this.modules[key].completed_tasks = completed_tasks;
        this.modules[key].per = completed_tasks / (module.tbl_project_tasks.length) * 100;
        this.modules[key].pieData = [
          { name: 'New - Yet to Start', value: new_tasks, color: '#2778a7' },
          { name: 'In Progress', value: in_progress_tasks, color: '#99b745' },
          { name: 'Completed', value: completed_tasks, color: '#17a88f' },
          { name: 'On Hold', value: onHold_tasks, color: '#f2ac37' },
          { name: 'Paused', value: paused_tasks, color: '#b74549' },];
      });
    });
    // -----------------------------------End------------------------------------------
  }

}
