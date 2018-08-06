import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../../services/company.service';
declare var d3: any;
declare var $: any;
import * as socketIo from 'socket.io-client';
import { Config } from './../../config/config';
@Component({
  selector: 'company-project-vs-status',
  templateUrl: './company-project-vs-status.component.html',
  styleUrls: ['./company-project-vs-status.component.css']
})
export class CompanyProjectVsStatusComponent implements OnInit {
  pieData: any;
  total_tasks: number = 0;
  new_tasks: number = 0;
  in_progress_tasks: number = 0;
  completed_tasks: number = 0;
  onHold_tasks: number = 0;
  paused_tasks: number = 0;
  projects: any;
  project_id: any;
  start_date: any;
  end_date: any;
  planned_hour: number = 0;
  actual_hour: number = 0;
  private socket: any;

  constructor(private companyService: CompanyService, private config: Config) {
    this.socket = socketIo(config.socketURL);
  }

  ngOnInit() {
    this.pieData = [
      { name: 'New - Yet to Start', value: this.new_tasks, color: '#2778a7' },
      { name: 'In Progress', value: this.in_progress_tasks, color: '#99b745' },
      { name: 'Completed', value: this.completed_tasks, color: '#17a88f' },
      { name: 'On Hold', value: this.onHold_tasks, color: '#f2ac37' },
      { name: 'Paused', value: this.paused_tasks, color: '#b74549' },
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
    this.companyService.getAllProject().subscribe(data => {
      this.projects = [];
      data.forEach(element => {
        if (element.status == "Planned" || element.status == "Completed" || element.status == "In Progress") {
          this.projects.push(element);
        }
      });
      if (this.projects.length == 0) {
      } else {
        this.project_id = this.projects[0].id;
        this.getData(this.project_id);
      }
    });
  }

  changeProject(pro_id) {
    this.getData(pro_id);
  }

  getData(pro_id) {
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

}
