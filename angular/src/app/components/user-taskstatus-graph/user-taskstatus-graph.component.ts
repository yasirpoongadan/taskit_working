import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
declare var d3: any;
declare var $: any;
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';

@Component({
  selector: 'user-taskstatus-graph',
  templateUrl: './user-taskstatus-graph.component.html',
  styleUrls: ['./user-taskstatus-graph.component.css'],
  // inputs: ['containerId','hold','inprogress','done','newy']
})
export class UserTaskstatusGraphComponent implements OnInit {

  projects: any;
  selectedValue1: any;
  projecttask: any;
  lastStatus2: any;
  newyetstart: any;
  countask = [];
  countaskdone2 = [];
  countaskhold2 = [];
  countaskinprogress2 = [];
  countasknew2 = [];
  completedTaskCount: number = 0;
  newTaskCount: number = 0;
  holdTaskCount: number = 0;
  pausedTaskCount: number = 0;
  inProgressTaskCount: number = 0;
  // countask=[];
  // containerId = '';
  hold = '';
  inprogress = '';
  done = '';
  newy = '';
  taskVstatExist = false;
  private socket: any;
  constructor(private userService: UserService, private config: Config) {
    this.socket = socketIo(config.socketURL);
  }

  ngOnInit() {
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
  }

  getAllProjects() {
    this.userService.getAllProject().subscribe(data => {

      this.projects = data;

      if (data.length > 0) {
        this.taskVstatExist = true;
        this.selectedValue1 = data[0].id;
        this.taskstatus1();
      }
      // else{
      //   console.log('no projects');
      // }


      // });
    });
  }
  //#########No.of task vs status###############
  taskstatus1() {
    // this.newyetstart=8;
    this.inProgressTaskCount = 0;
    this.newTaskCount = 0;
    this.holdTaskCount = 0;
    this.pausedTaskCount = 0;
    this.completedTaskCount = 0;
    this.userService.getProjectdetails(this.selectedValue1).subscribe(res => {
      // console.log(res)
      // this.projectsingle=res.singleproject;
      this.projecttask = res.myTasks;
      this.projecttask.forEach(elm_mod => {
        elm_mod.tbl_project_tasks.forEach(elm_task => {
          this.countask.push(elm_task.id);
          this.lastStatus2 = elm_task.tbl_task_status_assocs[elm_task.tbl_task_status_assocs.length - 1];
          // console.log(this.lastStatus2);
          if (this.lastStatus2 !== undefined) {
            if (this.lastStatus2.tbl_task_status.status == 'Done') {
              this.countaskdone2.push(elm_task.id);
              this.completedTaskCount = this.completedTaskCount + 1;
            }
            if (this.lastStatus2.tbl_task_status.status == 'Paused') {
              this.countaskdone2.push(elm_task.id);
              this.pausedTaskCount = this.pausedTaskCount + 1;
            }
            if (this.lastStatus2.tbl_task_status.status == 'Hold') {
              this.countaskhold2.push(elm_task.id);
              this.holdTaskCount = this.holdTaskCount + 1;
            }
            if (this.lastStatus2.tbl_task_status.status == 'In Progress') {
              this.countaskinprogress2.push(elm_task.id);
              this.inProgressTaskCount = this.inProgressTaskCount + 1;
            }
            if (this.lastStatus2.tbl_task_status.status == 'New yet to start') {
              this.countasknew2.push(elm_task.id);
              this.newTaskCount = this.newTaskCount + 1;
            }
          }
        });
      });

      // this.newyetstart = (this.countask.length) - (this.countaskdone2.length + this.countaskinprogress2.length + this.countaskhold2.length)
      // console.log(this.newyetstart+"uu") 
      this.bargraph();
    });



  }
  bargraph() {
    d3.select('#containerId').selectAll("svg").remove();
    const offenseNames = [
      "count",
    ];
    // console.log(this.newy)
    const years = ["New-Yet to Star", "On Hold", "In Progress", "Paused", "Completed"];
    const offensesByYear = [
      {
        // "count": this.countasknew2,
        "count": this.newTaskCount,
      },
      {
        // "count": this.countaskhold2.length,
        "count": this.holdTaskCount,
      },
      {
        // "count": this.countaskinprogress2.length,
        "count": this.inProgressTaskCount,
      },
      {
        // "count": this.newyetstart,
        "count": this.pausedTaskCount,
      },
      {
        // "count": this.countaskdone2.length,
        "count": this.completedTaskCount,
      },
    ];

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
    let margin = { top: 70, right: 15, bottom: 110, left: 50 },
      fullChartWidth = 350,
      fullChartHeight = 300,

      width = fullChartWidth - margin.left - margin.right,
      height = fullChartHeight - margin.top - margin.bottom;

    d3.select("#containerId")
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
      .select("#containerId")
      .append("svg")
      .attr("width", width + margin.left + margin.right + 20)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (margin.left + 20) + "," + margin.top + ")");
    let mycount = 1;
    svg.selectAll('.tick text').attr("transform", "translate(10) rotate(42 -17 31)");
    let layer = svg
      .selectAll(".layer")
      .data(layers)
      .enter()
      .append("g")
      .attr("class", "layer")
      .style("fill", (d, i) => {
        // mycount++;
        //  alert(mycount);
        // alert(i);
        // if(mycount == 0){
        //   mycount++;
        //   return '#7fc97f';

        // }else{
        //   mycount++;
        //   return  '#279428';
        // }
        //   alert(d);
        //  // alert(i);
        return '#7fc97f';
      });

    let tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    // alert(x.bandwidth());
    // alert(m);
    var myLPadd = 250;
    // var myTPadd = 620;
    var myTPadd = 820;
    let rect = layer
      .selectAll(".bar")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      // .attr("class", d => generateClassStr(d.offenseName) + " bar")
      .attr("x", function (d) {
        return x(d.year);
      })
      .attr("y", height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .on("mouseover", d => {
      //   d3.select(this)
      //   // .filter(dd => dd.class != d.class)
      //   //  .style("opacity", 0.6)
      })
      .on("mousemove", function (d) {
        // console.log(d);
        tooltip
          // .style("opacity", .9)
          .html("<b>" + d.data.count + "</b> tasks")
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

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
    // add the Y gridlines
    // svg.append("g")     
    // .attr("class", "grid")
    // .call(d3.axisLeft(y)
    //   .ticks(10)
    //   .tickSize(-width)
    //   .tickFormat("")
    // )

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
      .text("No of Tasks");
  }

}