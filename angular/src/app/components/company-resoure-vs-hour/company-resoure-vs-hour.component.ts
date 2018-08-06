import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../../services/company.service';
declare var d3: any;
declare var $: any;
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
@Component({
  selector: 'company-resoure-vs-hour',
  templateUrl: './company-resoure-vs-hour.component.html',
  styleUrls: ['./company-resoure-vs-hour.component.css']
})
export class CompanyResoureVsHourComponent implements OnInit {

  constructor(private companyService: CompanyService, private config: Config) {
    this.socket = socketIo(config.socketURL);
  }
  offenseNames: any;
  years: any;
  offensesByYear: any;
  projects: any;
  users: any;
  project_id: any;
  total_tasks: number = 0;
  new_tasks: number = 0;
  in_progress_tasks: number = 0;
  completed_tasks: number = 0;
  onHold_tasks: number = 0;
  paused_tasks: number = 0;
  count: number = 0;
  user_count: number = 0;
  proExists = false;
  userExists = false;
  private socket: any;

  ngOnInit() {
    this.getAllProjects();
    console.log("ngOnInit");
  
  } 
    ngAfterViewInit() {
      console.log("ngAfterViewInit");
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
    this.socket.on('inProgress', (data) => {
      this.getAllProjects();
    });
    this.getAllProjects();
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

    // this.years = ["Yasir", "Rinsha", "Sudha"];

  }
 
  getAllProjects() {
    console.log("getprojects");
    this.companyService.getAllProject().subscribe(data => {
      this.projects = [];
      data.forEach(element => {
        if (element.status == "Planned" || element.status == "Completed" || element.status == "In Progress") {
          this.projects.push(element);
        }
      });
      if (this.projects.length == 0) {
        this.users = [];
        this.proExists = false;
        //no data in charts
      } else {
        this.proExists = true;
        console.log("yasir" +this.projects[0].id)
        this.project_id = this.projects[0].id;
        this.getTeamMembers(this.projects[0].id);
      }
    });
  }

  changeProject(pro_id) {
    this.getTeamMembers(pro_id);
  }

  getTeamMembers(projId) {
    this.users = [];
    this.companyService.getUsers(projId).subscribe(data => {
      this.users = data;
      // console.log(data)
      if (this.users.length == 0) {
        this.userExists = false;
        // no data in charts
      } else {
        // this.years = ["Yasir", "Rinsha", "Sudha"];
        this.userExists = true;
        // console.log(this.userExists)         
        this.years = [];
        // console.log(this.users)
        this.users.forEach(element => {
          this.years.push(element.f_name + " " + element.l_name);
        });
        this.getData(projId, this.users);
      }
    });
  }

  getData(projId, users) {
    // ---------------------------------Start-------------------------------------------
    // Function      : getTasksforResourceGraph
    // Params        : pro_id, users
    // Returns       : 
    // Author        : Rinsha
    // Date          :  18-04-2018
    // Last Modified : 
    // Desc          : 
    this.companyService.getTasksforResourceGraph(projId, users).subscribe(data => {
      // console.log("data")
      // console.log(data)
      this.offensesByYear = data;
      this.drawGraph(this.offenseNames, this.years, this.offensesByYear);
    });
  }
  // -----------------------------------End------------------------------------------

  // this.offensesByYear = [];
  // this.user_count = 0;
  // this.count = 0;
  // this.user_count = this.users.length;
  // users.forEach(user => {
  //   let last_status: any;
  //   let last_status_id = 0;
  //   this.total_tasks = 0;
  //   this.new_tasks = 0;
  //   this.in_progress_tasks = 0;
  //   this.completed_tasks = 0;
  //   this.onHold_tasks = 0;
  //   this.paused_tasks = 0;
  //   // ---------------------------------Start-------------------------------------------
  //   // Function      : getTasksByUser
  //   // Params        : pro_id, user_id
  //   // Returns       : 
  //   // Author        : Rinsha
  //   // Date          :  17-04-2018
  //   // Last Modified : 
  //   // Desc          : 
  //   this.companyService.getTasksByUser(projId, user.id).subscribe(data => {
  //     // console.log(data);
  //     data.forEach(module => {
  //       this.total_tasks = this.total_tasks + module.tbl_project_tasks.length;
  //       module.tbl_project_tasks.forEach(task => {
  //         last_status_id = 0;
  //         last_status = {};
  //         task.tbl_task_status_assocs.forEach(statuses => {
  //           if (statuses.id > last_status_id) {
  //             last_status_id = statuses.id;
  //             last_status = statuses;
  //           }
  //         });
  //         if (last_status && last_status.status_id == 1) {
  //           this.new_tasks = this.new_tasks + 1;
  //         }
  //         if (last_status && last_status.status_id == 2) {
  //           this.paused_tasks = this.paused_tasks + 1;
  //         }
  //         if (last_status && last_status.status_id == 3) {
  //           this.in_progress_tasks = this.in_progress_tasks + 1;
  //         }
  //         if (last_status && last_status.status_id == 4) {
  //           this.onHold_tasks = this.onHold_tasks + 1;
  //         }
  //         if (last_status && last_status.status_id == 5) {
  //           this.completed_tasks = this.completed_tasks + 1;
  //         }
  //       });
  //     });
  //     // console.log("total task:" + this.total_tasks);
  //     // console.log("new task:" + this.new_tasks);
  //     // console.log("in pro task:" + this.in_progress_tasks);
  //     // console.log("completed task:" + this.completed_tasks);
  //     // console.log("onhold task:" + this.onHold_tasks);
  //     // console.log("paused task:" + this.paused_tasks);
  //     this.offensesByYear.push(
  //       {
  //         "New- Yet to Start": this.new_tasks,
  //         "In Progress": this.in_progress_tasks,
  //         "Completed": this.completed_tasks,
  //         "On Hold": this.onHold_tasks,
  //         "Paused": this.paused_tasks
  //       });
  //     this.count = this.count + 1;
  //   });

  // });
  // //  console.log(this.offensesByYear)
  // if (this.count == this.user_count) { 
  //   console.log(this.offensesByYear)
  //   this.drawGraph(this.offenseNames, this.years, this.offensesByYear);
  // }
  // // -----------------------------------End------------------------------------------

  drawGraph(offenseNames, years, offensesByYear) {
    console.log("new yasir");
    d3.select('#stacked-bar-chart-container').selectAll("svg").remove();
    let n = offenseNames.length, // number of layers
      m = offensesByYear.length, // number of samples per layer
      stack = d3.stack().keys(offenseNames);
    let layers = stack(offensesByYear); // calculate the stack layout

    layers.forEach(function (d, i) {
      // add keys to every datapoint

      d.forEach(function (dd, j) {
        // console.log(dd);
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
    let color = ["#2778a7", "#99b745", "#17a88f", , "#f2ac37", , "#b74549"]

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
        return color[i];
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
        // console.log(d);
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

}
