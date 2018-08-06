import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AdminService } from './../../services/admin.service'
var $:any;
declare var d3: any;

@Component({
  selector: 'app-admin-dashboard-pie',
  templateUrl: './admin-dashboard-pie.component.html',
  styleUrls: ['./admin-dashboard-pie.component.css']
})
export class AdminDashboardPieComponent implements OnInit {
  pieData:any;
  constructor(private superAdminService : AdminService) { }

  ngOnInit() {
    this.loadDetails();
  }
  loadDetails(){
    this.superAdminService.getPieDataforAdminDashboard().subscribe(resData =>{
     console.log(resData)
      this.pieData = resData;
      this.drawPie();
      
    });
  }

  drawPie(){
    // const pieData = [
    //   {name: 'Running', value: 40, color: '#18FFFF'},
    //   {name: 'Paused', value: 40, color: '#0288D1'},
    //   {name: 'Stopped', value: 7, color: '#BF360C'},
    //   {name: 'Failed', value: 13, color: '#F4511E'},
    //   {name: 'Unknown', value: 19, color: '#F9A825'},
    // ];
    bakeDonut(this.pieData);
    
    function bakeDonut(d) {
      let activeSegment;
      const data = d.sort( (a, b) => b['value'] - a['value']),
            viewWidth = 500,
            viewHeight = 300,
            svgWidth = viewHeight,
            svgHeight = viewHeight,
            thickness = 40,
            colorArray = data.map(k => k.color),
            el = d3.select('.pie-gr'),
            radius = Math.min(svgWidth, svgHeight) / 2,
            color = d3.scaleOrdinal()
              .range(colorArray);
    
      const max = d3.max(data, (maxData) => maxData.value );
    
      const svg = el.append('svg')
      .attr('viewBox', `0 0 ${viewWidth + thickness} ${viewHeight + thickness}`)
      .attr('class', 'pie')
      .attr('width', viewWidth)
      .attr('height', svgHeight);
    
      const g = svg.append('g')
      .attr('transform', `translate( ${ (svgWidth / 2) + (thickness / 2) }, ${ (svgHeight / 2) + (thickness / 2)})`);
    
      const arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
    
      const arcHover = d3.arc()
      .innerRadius(radius - ( thickness + 5 ))
      .outerRadius(radius + 8);
    
      const pie = d3.pie()
      .value(function(pieData) { return pieData.value; })
      .sort(null);
    
      var maxAssigned = false;
      var maxArcAssigned = false;
      const path = g.selectAll('path')
      .attr('class', 'data-path')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'data-group')
      .each(function(pathData, i) {
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
      .on('mouseover', function() {
        const _thisPath = this,
              parentNode = _thisPath.parentNode;
    
        if (_thisPath !== activeSegment) {
    
          activeSegment = _thisPath;
    
          const dataTexts = d3.selectAll('.data-text')
          .classed('data-text--show', false);
    
          const paths = d3.selectAll('.data-path')
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
      .each(function(v, i) {
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
      .attr('transform', function(legendData, i) {
        const itemHeight =    legendRectSize + legendSpacing;
        const offset =        legendRectSize * color.domain().length;
        const horz =          svgWidth + 80;
        const vert =          (i * itemHeight) + legendRectSize + (svgHeight - offset) / 2;
        return `translate(${horz}, ${vert})`;
      });
    
      legend.append('circle')
        .attr('r', legendRectSize / 2)
        .style('fill', color);
    
      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .attr('class', 'legend-text')
        .text( (legendData) => legendData )
  }
  }

}
