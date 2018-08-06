import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
declare var d3: any;
declare var $: any;
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
import { MatTabChangeEvent } from '@angular/material';
@Component({
  selector: 'user-task-vs-status',
  templateUrl: './user-task-vs-status.component.html',
  styleUrls: ['./user-task-vs-status.component.css']
})
export class UserTaskVsStatusComponent implements OnInit {
  selectedValue: any;
  projectsingle: any;
  projecttask: any;
  lastStatus: any;
  projects = [];
  users = [];
  countask = [];
  countaskdone = [];
  countaskhold = [];
  countaskinprogress = [];
  countasknew = [];
  newyetstart: any;
  taskVstatExist = false;
  private socket: any;
  completedTaskCount: number = 0;
  newTaskCount: number = 0;
  holdTaskCount: number = 0;
  pausedTaskCount: number = 0;
  inProgressTaskCount: number = 0;
  pieData: any;
  total_task : number = 0;
  constructor(private userService: UserService, private config: Config) {
    this.socket = socketIo(config.socketURL);
  }


  ngOnInit() {
    this.pieData = [
      { name: 'New - Yet to Start', value: this.newTaskCount, color: '#2778a7' },
      { name: 'In Progress', value: this.inProgressTaskCount, color: '#99b745' },
      { name: 'Completed', value: this.completedTaskCount, color: '#17a88f' },
      { name: 'On Hold', value: this.holdTaskCount, color: '#f2ac37' },
      { name: 'Paused', value: this.pausedTaskCount, color: '#b74549' },
    ];
    this.bakeDonut(this.pieData);
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
      // this.selectedValue=data[0].id
      //  console.log(data[0].id);

      this.projects = data;
      if (data.length > 0) {
        this.taskVstatExist = true;
        this.selectedValue = data[0].id
      }
      // else{
      //   console.log('no projects');
      // }

      this.taskstatus();
      // });
    });
  }
  taskstatus() {
    // this.projects.forEach(element => {
    // console.log(this.selectedValue);
    // this.selectedValue=element.id
    // console.log(this.selectedValue);
    this.total_task = 0;
    this.userService.getProjectdetails(this.selectedValue).subscribe(res => {
      // console.log(res)
      this.inProgressTaskCount = 0;
      this.newTaskCount = 0;
      this.holdTaskCount = 0;
      this.pausedTaskCount = 0;
      this.completedTaskCount = 0;
      this.projectsingle = res.singleproject;
      this.projecttask = res.myTasks;
      this.projecttask.forEach(elm_mod => {
        // console.log(elm_mod)
        this.total_task = this.total_task + elm_mod.tbl_project_tasks.length;
        elm_mod.tbl_project_tasks.forEach(elm_task => {
          this.countask.push(elm_task.id);
          this.lastStatus = elm_task.tbl_task_status_assocs[elm_task.tbl_task_status_assocs.length - 1];
          // console.log(this.lastStatus.tbl_task_status.status)
          // console.log(this.lastStatus.tbl_task_status.id)
          // });
          if (this.lastStatus !== undefined) {
            if (this.lastStatus.tbl_task_status.status == 'Done') {
              this.countaskdone.push(elm_task.id);
              this.completedTaskCount = this.completedTaskCount + 1;
            }
            if (this.lastStatus.tbl_task_status.status == 'Paused') {
              this.countaskdone.push(elm_task.id);
              this.pausedTaskCount = this.pausedTaskCount + 1;
            }
            if (this.lastStatus.tbl_task_status.status == 'Hold') {
              this.countaskhold.push(elm_task.id);
              this.holdTaskCount = this.holdTaskCount + 1;
            }
            if (this.lastStatus.tbl_task_status.status == 'In Progress') {
              this.countaskinprogress.push(elm_task.id);
              this.inProgressTaskCount = this.inProgressTaskCount + 1;
            }
            if (this.lastStatus.tbl_task_status.status == 'New yet to start') {
              this.countasknew.push(elm_task.id);
              this.newTaskCount = this.newTaskCount + 1;
            }
          }

          // console.log(elm_task)
          //  console.log(this.countaskhold.length)
        });
      });
      // this.newyetstart = (this.countask.length) - (this.countaskdone.length + this.countaskinprogress.length + this.countaskhold.length)
      const pieData = [
        // { name: 'New - Yet to Start', value: this.newyetstart, color: '#2778a7' },
        // { name: 'In Progress', value: this.countaskinprogress.length, color: '#99b745' },
        // { name: 'Completed', value: this.countaskdone.length, color: '#17a88f' },
        // { name: 'On Hold', value: this.countaskhold.length, color: '#f2ac37' },
        { name: 'New - Yet to Start', value: this.newTaskCount, color: '#2778a7' },
        { name: 'In Progress', value: this.inProgressTaskCount, color: '#99b745' },
        { name: 'Completed', value: this.completedTaskCount, color: '#17a88f' },
        { name: 'On Hold', value: this.holdTaskCount, color: '#f2ac37' },
        { name: 'Paused', value: this.pausedTaskCount, color: '#b74549' },
      ];
      d3.select('#taskstatus').selectAll("svg").remove();
      this.bakeDonut(pieData);

    });


  }

  // console.log(this.countask)
  // getUsers(projId){
  //   this.companyService.getUsers(projId).subscribe(data=>{
  //     this.users = data;
  //   });
  // }

  bakeDonut(d) {
    let activeSegment;
    const data = d.sort((a, b) => b['value'] - a['value']),
      viewWidth = 400,
      viewHeight = 300,
      svgWidth = viewHeight,
      svgHeight = viewHeight,
      shuhaibPading =110,
      thickness = 40,
      colorArray = data.map(k => k.color),
      el = d3.select('#taskstatus'),
      radius = Math.min(svgWidth, svgHeight) / 2,
      color = d3.scaleOrdinal()
        .range(colorArray);

    const max = d3.max(data, (maxData) => maxData.value);

    const svg = el.append('svg')
      .attr('viewBox', `0 0 ${viewWidth + thickness +shuhaibPading} ${viewHeight + thickness + shuhaibPading}`)
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

          const dataTexts = d3.selectAll('#taskstatus .data-text')
            .classed('data-text--show', false);

          const paths = d3.selectAll('#taskstatus .data-path')
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

}