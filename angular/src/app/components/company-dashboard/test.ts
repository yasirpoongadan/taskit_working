import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../../services/company.service';
import { DragulaService } from 'ng2-dragula';
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
import { MatTabChangeEvent } from '@angular/material';
import { ViewEncapsulation} from '@angular/core';
// -------------------------------------------------------------------declare d3----------------------------------------------------
declare var d3: any;
declare var $: any;
  // ----------------------------------------------------------------End declare d3-------------------------------------------------
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
 // ----------------------------------------------------------------Resource vs task hour-------------------------------------------------
  offenseNames: any;
  proExists = false;
  projectsResourceVsTaskhour =[];
  userExists = false;
  years: any;
  offensesByYear: any;
  // -------------------------------------------------------------  End Resource vs task hour-------------------------------------------------
   // ----------------------------------------------------------------Project vs task hour-------------------------------------------------
  projectsVsHour =[];
  exists = false;
  yearsprojectsVsHour :any;
  offenseNamesProjectVsHour :any;
 // ----------------------------------------------------------------End Prject vs task hour-------------------------------------------------

  // ----------------------------------------------------------------Prject vs status-------------------------------------------------
  pieData: any;
  ProjectVsStatus=[];
  
   // ----------------------------------------------------------------End Prject vs status-------------------------------------------------
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

    // ----------------------------------------------------------------Resource vs task hour-------------------------------------------------

    console.log("ngAfterViewInit");
    this.socket.on('new', (data) => {
      this.getAllProjectsResourceVsTaskhour();
    });
    this.socket.on('paused', (data) => {
      this.getAllProjectsResourceVsTaskhour();
    });
    this.socket.on('completed', (data) => {
      this.getAllProjectsResourceVsTaskhour();
    });
    this.socket.on('hold', (data) => {
      this.getAllProjectsResourceVsTaskhour();
    });
    this.socket.on('inProgress', (data) => {
      this.getAllProjectsResourceVsTaskhour();
    });
    this.socket.on('inProgress', (data) => {
      this.getAllProjectsResourceVsTaskhour();
    });
    this.getAllProjectsResourceVsTaskhour();
    this.offenseNames = [
      // "Completed",
      // "Fondling",
      // "Statutory Completed",
      // "Sa"
      "New- Yet to Start",
      "In Progress",
      "Completed",
      "On Hold",
      "Paused"
    ];
// ----------------------------------------------------------------End Resource vs task hour---------------------------------------------------

// -------------------------------------------------------------------Project Vs Hour ----------------------------------------------------------
this.getProjectVsHour();
this.socket.on('new', (data) => {
  this.getProjectVsHour();
});
this.socket.on('paused', (data) => {
  this.getProjectVsHour();
});
this.socket.on('completed', (data) => {
  this.getProjectVsHour();
});
this.socket.on('hold', (data) => {
  this.getProjectVsHour();
});
this.socket.on('inProgress', (data) => {
  this.getProjectVsHour();
});
this.getProjectVsHour();
this.offenseNamesProjectVsHour = [
  "New- Yet to Start",
  "In Progress",
  "Completed",
  "On Hold",
  "Paused"
];
// -------------------------------------------------------------------End Project Vs Hour ----------------------------------------------------------

// -------------------------------------------------------------------Project Vs status ------------------------------------------------------------
this.pieData = [
  { name: 'New - Yet to Start', value: this.new_tasks, color: '#2778a7' },
  { name: 'In Progress', value: this.in_progress_tasks, color: '#99b745' },
  { name: 'Completed', value: this.completed_tasks, color: '#17a88f' },
  { name: 'On Hold', value: this.onHold_tasks, color: '#f2ac37' },
  { name: 'Paused', value: this.paused_tasks, color: '#b74549' },
];
this.bakeDonut(this.pieData);
this.socket.on('new', (data) => {
  this.getProjectVsStatus();
});
this.socket.on('paused', (data) => {
  this.getProjectVsStatus();
});
this.socket.on('completed', (data) => {
  this.getProjectVsStatus();
});
this.socket.on('hold', (data) => {
  this.getProjectVsStatus();
});
this.socket.on('inProgress', (data) => {
  this.getProjectVsStatus();
});
this.getProjectVsStatus();
// ------------------------------------------------------------------- End Project Vs status ----------------------------------------------------------
  }
  onTabLinkClick(event: MatTabChangeEvent) {
    this.getAllProjects();
    this.getAllProjectsResourceVsTaskhour();
    this.getProjectVsHour();
    this.getProjectVsStatus();
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

// ---------------------------------------------------------------- Resource vs task hour-------------------------------------------------
  }
    getAllProjectsResourceVsTaskhour() {
      this.companyService.getAllProject().subscribe(data => {
        this.projectsResourceVsTaskhour = [];
        data.forEach(element => {
          if (element.status == "Planned" || element.status == "Completed" || element.status == "In Progress") {
            this.projectsResourceVsTaskhour.push(element);
          }
        });
        if (this.projectsResourceVsTaskhour.length == 0) {
          this.users = [];
          this.proExists = false;
          //no data in charts
        } else {
          this.proExists = true;
          
          this.project_id = this.projectsResourceVsTaskhour[0].id;
          this.getTeamMembers(this.projectsResourceVsTaskhour[0].id);
        }
      });
    }
    changeProjectResourceVsTaskhour(pro_id) {
      this.getTeamMembers(pro_id);
    }
    getTeamMembers(projId) {
      this.users = [];
      this.companyService.getUsers(projId).subscribe(data => {
        this.users = data;
     
        if (this.users.length == 0) {
          this.userExists = false;
          // no data in charts
        } else {
          // this.years = ["Yasir", "Rinsha", "Sudha"];
          this.userExists = true;
         
          this.years = [];
      
          this.users.forEach(element => {
            this.years.push(element.f_name + " " + element.l_name);
          });
          this.getDataResourceVsTaskhour(projId, this.users);
        }
      });
    }
    getDataResourceVsTaskhour(projId, users) {
      // ---------------------------------Start-------------------------------------------
      // Function      : getTasksforResourceGraph
      // Params        : pro_id, users
      // Returns       : 
      // Author        : Rinsha
      // Date          :  18-04-2018
      // Last Modified : 
      // Desc          : 
      this.companyService.getTasksforResourceGraph(projId, users).subscribe(data => {
       
        this.offensesByYear = data;
        this.drawGraph(this.offenseNames, this.years, this.offensesByYear);
      });
    }
    drawGraph(offenseNames, years, offensesByYear) {
     
      d3.select('#stacked-bar-chart-container').selectAll("svg").remove();
      let n = offenseNames.length, // number of layers
        m = offensesByYear.length, // number of samples per layer
        stack = d3.stack().keys(offenseNames);
      let layers = stack(offensesByYear); // calculate the stack layout
  
      layers.forEach(function (d, i) {
        // add keys to every datapoint
  
        d.forEach(function (dd, j) {
          
          dd.year = years[j];
          dd.offenseName = offenseNames[i];
          dd.class = generateClassStr(dd.offenseName);
          dd.value = dd.data[dd.offenseName]
        });
      });
  
      function generateClassStr(str) {
        return str.replace(/\s+/g, '-').toLowerCase();
      }
      let yStackMax = d3.max(layers, function (layer) {
        return d3.max(layer, function (d) {
          return d[1];
        });
      });
      let margin = { top: 70, right: 15, bottom: 140, left: 50 },
        fullChartWidth = 1000,
        fullChartHeight = 400,
        width = fullChartWidth - margin.left - margin.right,
        height = fullChartHeight - margin.top - margin.bottom;
  
      d3.select("#stacked-bar-chart-container")
        .style("width", fullChartWidth)
        .style("height", fullChartHeight)
  
      let x = d3
        .scaleBand()
        .domain(years)
        .rangeRound([0, width])
        .padding(0.08);
      let y = d3
        .scaleLinear()
        .domain([0, yStackMax])
        .range([height, 0]);
      let z = d3
        .scaleBand()
        .domain(offenseNames)
        .rangeRound([0, x.bandwidth()]);
      let color = 
        {'New- Yet to Start' :"#2778a7", 
        'In Progress' : "#99b745", 
        'Completed':"#17a88f", 
        'On Hold':"#f2ac37", 
        'Paused':"#b74549"}
  
      let svg = d3
        .select("#stacked-bar-chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + (margin.left + 20) + "," + margin.top + ")");
      let layer = svg
        .selectAll(".layer")
        .data(layers)
        .enter()
        .append("g")
        .attr("class", "layer")
        .style("fill", function (d, i) {
          // console.log(color);
          // console.log(d);
          // console.log(color[d.key]);
          // console.log(color[i]);
          return color[d.key];
        });
  
      // Define the div for the tooltip
      let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
      // alert(x.bandwidth());
      // alert(m);
      var myLPadd = 270;
      // var myTPadd = 620;
      var myTPadd = 860;
      let rect = layer
        .selectAll(".bar")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("class", d => generateClassStr(d.offenseName) + " bar")
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("y", height)
        .attr("width", x.bandwidth())
        // .attr("width", x.bandwidth()/x)
        .attr("height", 0)
        .on("mouseover", d => {
          // d3.selectAll(".bar")
          //   .filter(dd => dd.class != d.class)
          //   .style("opacity", 0.6)
        })
        .on("mousemove", function (d) {
         
          let msgy = (d.data.totalCompletedHr != 0 && d.offenseName == 'Completed') ? ', Actual hour taken : ' + d.data.totalCompletedHr + ' Hr' : '';
          tooltip
            .style("opacity", .9)
            .html("<b>" + d.value + "</b> Hr task is " + d.offenseName + " for " + d.year + msgy)
            .style("left", (d3.mouse(this)[0]) + myLPadd + "px")
            .style("top", (d3.mouse(this)[1]) + myTPadd + "px");
        })
        .on("mouseout", function (d) {
          d3.selectAll(".bar").style("opacity", 1)
          tooltip.style("opacity", 0);
        });
  
      rect
        .transition()
        .delay(function (d, i) {
          return i * 10;
        })
        .attr("y", function (d) {
          return y(d[1]);
        })
        .attr("height", function (d) {
          return y(d[0]) - y(d[1]);
        });
      // alert(height);
      // height = 10;
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0))
        // .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
      // .append("g")
      // .attr("class", "x axis")
      // .attr("transform", "translate(0," + height + ")")
      // .call(d3.axisBottom(x).tickSizeOuter(0))
      // .attr("transform", "rotate(-90)");
  
      // add the Y gridlines
      svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
          .ticks(25)
          // .tickSize(-width)
          .tickFormat("")
        )
  
      // Add the y Axis
      svg.append("g")
        .call(d3.axisLeft(y));
  
      // text label for the y axis
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 30)
        .attr("x", 0 - (height / 2))
        .attr("dy", "3em")
        .style("text-anchor", "middle")
        .text("Total hours");
  
      let legend = svg
        .selectAll(".legend")
        .data(offenseNames.reverse()) // match stack order
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 15 + ")";
        });
  
      legend
        .append("rect")
        .attr("x", width - 10)
        .attr("y", -70)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
          // console.log(d);
          return color[d]; // match stack order
        });
  
      legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", -65)
        .attr("font-size", '10px')
        .attr("dy", ".35em")
        .attr("class", "barGraphLegend")
        .style("text-anchor", "end")
        .text(function (d) {
          return d;
        });
  
      d3.selectAll("input").on("change", change);
  
      function change() {
        (this.value === "grouped") ? transitionGrouped() : transitionStacked();
      }
  
      function transitionGrouped() {
        rect
          .transition()
          .duration(500)
          .delay(function (d, i) {
            return i * 10;
          })
          .attr("x", function (d) {
            return x(d.year) + z(d.offenseName);
          })
          .transition()
          .attr("y", function (d) {
            return y(d.data[d.offenseName]);
          })
          .attr("height", function (d) {
            return height - y(d.data[d.offenseName]);
          });
      }
  
      function transitionStacked() {
        rect
          .transition()
          .duration(500)
          .delay(function (d, i) {
            return i * 10;
          })
          .attr("y", function (d) {
            return y(d[1]);
          })
          .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
          })
          .transition()
          .attr("x", function (d) {
            return x(d.year);
          })
      }
  
  
    }
    // ----------------------------------------------------------------End Resource vs task hour-------------------------------------------------

     // ----------------------------------------------------------------Project Vs Hour-------------------------------------------------
     getProjectVsHour() {
     
      // ---------------------------------Start-------------------------------------------
      // Function      : getTasksforResourceGraph
      // Params        : pro_id, users
      // Returns       : 
      // Author        : Rinsha
      // Date          :  18-04-2018
      // Last Modified : 
      // Desc          : 
      this.companyService.getAllProject().subscribe(data => {
       
        this.projectsVsHour = [];
        this.yearsprojectsVsHour = [];
        data.forEach(element => {
          if (element.status == "Planned" || element.status == "Completed" || element.status == "In Progress") {
            this.projectsVsHour.push(element);
            this.yearsprojectsVsHour.push(element.project_name)
          }
        });
        if (this.projectsVsHour.length == 0) {
          //no data in charts
        } else {
          this.exists = true;
          this.companyService.getHoursforResourceGraph(this.projectsVsHour).subscribe(info => {
       
            this.drawGraphprojectsVsHour(this.offenseNames, this.yearsprojectsVsHour, info);
        });
      };
      });
    }
      // -----------------------------------End------------------------------------------
      drawGraphprojectsVsHour(offenseNames, years, offensesByYear) {
        d3.select('#stacked-bar-chart-container1').selectAll("svg").remove();
        const generateClassStr = str => {
          return str.replace(/\s+/g, '-').toLowerCase();
        }
    
        let n = offenseNames.length, // number of layers
          m = offensesByYear.length, // number of samples per layer
          stack = d3.stack().keys(offenseNames);
    
        let layers = stack(offensesByYear); // calculate the stack layout
    
        layers.forEach(function (d, i) {
          // add keys to every datapoint
          d.forEach(function (dd, j) {
            dd.year = years[j];
            dd.offenseName = offenseNames[i];
            dd.class = generateClassStr(dd.offenseName);
            dd.value = dd.data[dd.offenseName]
          });
        });
    
        let yStackMax = d3.max(layers, function (layer) {
          return d3.max(layer, function (d) {
            return d[1];
          });
        });
        let margin = { top: 70, right: 15, bottom: 140, left: 50 },
          fullChartWidth = 1000,
          fullChartHeight = 400,
          width = fullChartWidth - margin.left - margin.right,
          height = fullChartHeight - margin.top - margin.bottom;
    
        d3.select("#stacked-bar-chart-container1")
          .style("width", fullChartWidth)
          .style("height", fullChartHeight)
        let x = d3
          .scaleBand()
          .domain(years)
          .rangeRound([0, width])
          .padding(0.08);
        let y = d3
          .scaleLinear()
          .domain([0, yStackMax])
          .range([height, 0]);
        let z = d3
          .scaleBand()
          .domain(offenseNames)
          .rangeRound([0, x.bandwidth()]);
        // let color = ["#17a88f", "#f2ac37", "#b74549", , "#4d5d6e", , "#2778a7"]
        let color = ["#2778a7", "#99b745", "#17a88f", , "#f2ac37", , "#b74549"]
        let svg = d3
          .select("#stacked-bar-chart-container1")
          .append("svg")
          .attr("width", width + margin.left + margin.right + 20)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + (margin.left + 20) + "," + margin.top + ")");
        let layer = svg
          .selectAll(".layer")
          .data(layers)
          .enter()
          .append("g")
          .attr("class", "layer")
          .style("fill", function (d, i) {
            return color[i];
          });
    
        // Define the div for the tooltip
        let tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);
        // alert(x.bandwidth());
        // alert(m);
        var myLPadd = 270;
        var myTPadd = 1420;
        // var myLPadd = 950;
        // var myTPadd = 720;
        let rect = layer
          .selectAll(".bar")
          .data(function (d) {
            return d;
          })
          .enter()
          .append("rect")
          .attr("class", d => generateClassStr(d.offenseName) + " bar")
          .attr("x", function (d) {
            return x(d.year);
          })
          .attr("y", height)
          .attr("width", x.bandwidth())
          // .attr("width", x.bandwidth()/x)
          .attr("height", 0)
          .on("mouseover", d => {
            // d3.selectAll(".bar")
            //   .filter(dd => dd.class != d.class)
            //   .style("opacity", 0.6)
          })
          .on("mousemove", function (d) {
            let msgy = (d.data.totalCompletedHr != 0 && d.offenseName == 'Completed') ? ', Actual hour taken : ' + d.data.totalCompletedHr + ' Hr' : '';
            tooltip
              .style("opacity", .9)
              // .html("<b>" + d.value + "</b> Hr task is " + d.offenseName + " for " + d.year )
               .html("<b>" + d.value + "</b> Hr task is " + d.offenseName + " for " + d.year + msgy)
              .style("left", (d3.mouse(this)[0]) + myLPadd + "px")
              .style("top", (d3.mouse(this)[1]) + myTPadd + 40 + "px");
          })
          .on("mouseout", function (d) {
            d3.selectAll(".bar").style("opacity", 1)
            tooltip.style("opacity", 0);
          });
    
        rect
          .transition()
          .delay(function (d, i) {
            return i * 10;
          })
          .attr("y", function (d) {
            return y(d[1]);
          })
          .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
          });
        // alert(height);
        // height = 10;
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).tickSizeOuter(0))
          // .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");
        // .append("g")
        // .attr("class", "x axis")
        // .attr("transform", "translate(0," + height + ")")
        // .call(d3.axisBottom(x).tickSizeOuter(0))
        // .attr("transform", "rotate(-90)");
    
        // add the Y gridlines
        svg.append("g")
          .attr("class", "grid")
          .call(d3.axisLeft(y)
            .ticks(25)
            //  .tickSize(-width)
            .tickFormat("")
          )
    
        // Add the y Axis
        svg.append("g")
          .call(d3.axisLeft(y));
    
        // text label for the y axis
        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left - 30)
          .attr("x", 0 - (height / 2))
          .attr("dy", "3em")
          .style("text-anchor", "middle")
          .text("Total hours");
    
        let legend = svg
          .selectAll(".legend")
          .data(offenseNames.reverse()) // match stack order
          .enter()
          .append("g")
          .attr("class", "legend")
          .attr("transform", function (d, i) {
            return "translate(0," + i * 15 + ")";
          });
    
        legend
          .append("rect")
          .attr("x", width - 10)
          .attr("y", -70)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function (d, i) {
            return color[offenseNames.length - 1 - i]; // match stack order
          });
    
        legend
          .append("text")
          .attr("x", width - 24)
          .attr("y", -65)
          .attr("font-size", '10px')
          .attr("dy", ".35em")
          .attr("class", "barGraphLegend")
          .style("text-anchor", "end")
          .text(function (d) {
            return d;
          });
    
        d3.selectAll("input").on("change", change);
    
        function change() {
          (this.value === "grouped") ? transitionGrouped() : transitionStacked();
        }
    
        function transitionGrouped() {
          rect
            .transition()
            .duration(500)
            .delay(function (d, i) {
              return i * 10;
            })
            .attr("x", function (d) {
              return x(d.year) + z(d.offenseName);
            })
            .transition()
            .attr("y", function (d) {
              return y(d.data[d.offenseName]);
            })
            .attr("height", function (d) {
              return height - y(d.data[d.offenseName]);
            });
        }
        function transitionStacked() {
          rect
            .transition()
            .duration(500)
            .delay(function (d, i) {
              return i * 10;
            })
            .attr("y", function (d) {
              return y(d[1]);
            })
            .attr("height", function (d) {
              return y(d[0]) - y(d[1]);
            })
            .transition()
            .attr("x", function (d) {
              return x(d.year);
            })
        }
    
      }
       // -------------------------------------------------------------------End Project Vs Hour-------------------------------------------------
           // ---------------------------------------------------------------Project Vs status-------------------------------------------------
      getProjectVsStatus() {
        this.companyService.getAllProject().subscribe(data => {
          this.ProjectVsStatus = [];
          data.forEach(element => {
            if (element.status == "Planned" || element.status == "Completed" || element.status == "In Progress") {
              this.ProjectVsStatus.push(element);
         
            }
          });
          if (this.ProjectVsStatus.length == 0) {
          } else {
            this.project_id = this.ProjectVsStatus[0].id;
           
            this.getDataVsStatus(this.project_id);
          }
        });
      }

      changeProjectVsStatus(pro_id) {
        this.getDataVsStatus(pro_id);
      }
    
      getDataVsStatus(pro_id) {
        let last_status: any;
        let last_status_id = 0;
        this.total_tasks = 0;
        this.new_tasks = 0;
        this.in_progress_tasks = 0;
        this.completed_tasks = 0;
        this.onHold_tasks = 0;
        this.paused_tasks = 0;
        this.planned_hour = 0;
        this.actual_hour = 0;
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
          data.forEach(module => {
            this.total_tasks = this.total_tasks + module.tbl_project_tasks.length;
            this.start_date = module.tbl_project.planned_start_date;
            this.end_date = module.tbl_project.planned_end_date;
            module.tbl_project_tasks.forEach(task => {
              if (task.planned_hour != null) {
                this.planned_hour = this.planned_hour + task.planned_hour + task.buffer_hour;
              }
              if (task.actual_hour != null) {
                this.actual_hour = this.actual_hour + task.actual_hour;
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
                this.new_tasks = this.new_tasks + 1;
              }
              if (last_status && last_status.status_id == 2) {
                this.paused_tasks = this.paused_tasks + 1;
              }
              if (last_status && last_status.status_id == 3) {
                this.in_progress_tasks = this.in_progress_tasks + 1;
              }
              if (last_status && last_status.status_id == 4) {
                this.onHold_tasks = this.onHold_tasks + 1;
              }
              if (last_status && last_status.status_id == 5) {
                this.completed_tasks = this.completed_tasks + 1;
              }
            });
          });
          this.pieData = [
            { name: 'New - Yet to Start', value: this.new_tasks, color: '#2778a7' },
            { name: 'In Progress', value: this.in_progress_tasks, color: '#99b745' },
            { name: 'Completed', value: this.completed_tasks, color: '#17a88f' },
            { name: 'On Hold', value: this.onHold_tasks, color: '#f2ac37' },
            { name: 'Paused', value: this.paused_tasks, color: '#b74549' },
          ];
          this.bakeDonut(this.pieData);
        });
        // -----------------------------------End------------------------------------------
      }
    
      bakeDonut(d) {
        d3.select('#chart2').selectAll("svg").remove();
        let activeSegment;
        const data = d.sort((a, b) => b['value'] - a['value']),
          viewWidth = 500,
          viewHeight = 300,
          svgWidth = viewHeight,
          svgHeight = viewHeight,
          thickness = 40,
          colorArray = data.map(k => k.color),
          el = d3.select('#chart2'),
          radius = Math.min(svgWidth, svgHeight) / 2,
          color = d3.scaleOrdinal()
            .range(colorArray);
    
        const max = d3.max(data, (maxData) => maxData.value);
    
        const svg = el.append('svg')
          .attr('viewBox', `0 0 ${viewWidth + thickness} ${viewHeight + thickness}`)
          .attr('class', 'pie')
          .attr('width', viewWidth)
          .attr('height', svgHeight);
    
        const g = svg.append('g')
          .attr('transform', `translate( ${(svgWidth / 2) + (thickness / 2)}, ${(svgHeight / 2) + (thickness / 2)})`);
    
        const arc = d3.arc()
          .innerRadius(radius - thickness)
          .outerRadius(radius);
    
        const arcHover = d3.arc()
          .innerRadius(radius - (thickness + 5))
          .outerRadius(radius + 8);
    
        const pie = d3.pie()
          .value(function (pieData) { return pieData.value; })
          .sort(null);
    
        var maxAssigned = false;
        var maxArcAssigned = false;
        const path = g.selectAll('path')
          .attr('class', 'data-path')
          .data(pie(data))
          .enter()
          .append('g')
          .attr('class', 'data-group')
          .each(function (pathData, i) {
            const group = d3.select(this)
    
            group.append('text')
              .text(`${pathData.data.value}`)
              .attr('class', 'data-text data-text__value')
              .attr('text-anchor', 'middle')
              .attr('dy', '0em')
    
            group.append('text')
              .text(`${pathData.data.name}`)
              .attr('class', 'data-text data-text__name')
              .attr('text-anchor', 'middle')
              .attr('dy', '1.5em')
    
            // Set default active segment
            if (pathData.value === max && !maxAssigned) {
              const textVal = d3.select(this).select('.data-text__value')
                .classed('data-text--show', true);
    
              const textName = d3.select(this).select('.data-text__name')
                .classed('data-text--show', true);
              maxAssigned = true;
            }
    
          })
          .append('path')
          .attr('d', arc)
          .attr('fill', (fillData, i) => color(fillData.data.name))
          .attr('class', 'data-path')
          .on('mouseover', function () {
            const _thisPath = this,
              parentNode = _thisPath.parentNode;
    
            if (_thisPath !== activeSegment) {
    
              activeSegment = _thisPath;
    
              const dataTexts = d3.selectAll('#chart2 .data-text')
                .classed('data-text--show', false);
    
              const paths = d3.selectAll('#chart2 .data-path')
                .transition()
                .duration(250)
                .attr('d', arc);
    
              d3.select(_thisPath)
                .transition()
                .duration(250)
                .attr('d', arcHover);
    
              const thisDataValue = d3.select(parentNode).select('.data-text__value')
                .classed('data-text--show', true);
              const thisDataText = d3.select(parentNode).select('.data-text__name')
                .classed('data-text--show', true);
            }
    
    
          })
          .each(function (v, i) {
            if (v.value === max && !maxArcAssigned) {
              const maxArc = d3.select(this)
                .attr('d', arcHover);
              activeSegment = this;
              maxArcAssigned = true;
            }
            this._current = i;
          });
    
        const legendRectSize = 15;
        const legendSpacing = 10;
    
        const legend = svg.selectAll('.legend')
          .data(color.domain())
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', function (legendData, i) {
            const itemHeight = legendRectSize + legendSpacing;
            const offset = legendRectSize * color.domain().length;
            const horz = svgWidth + 80;
            const vert = (i * itemHeight) + legendRectSize + (svgHeight - offset) / 2;
            return `translate(${horz}, ${vert})`;
          });
    
        legend.append('circle')
          .attr('r', legendRectSize / 2)
          .style('fill', color);
    
        legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .attr('class', 'legend-text')
          .text((legendData) => legendData)
      }
    
           // ---------------------------------------------------------------End Project Vs status-------------------------------------------------
}
