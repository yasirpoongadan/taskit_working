import { Component, OnInit } from '@angular/core';
import { AdminService} from './../../services/admin.service';
import {Router} from '@angular/router';
import { Config } from './../../config/config';
import * as socketIo from 'socket.io-client';
declare var d3: any;
// declare var $:any;

@Component({
  selector: 'user-dashboard-bar',
  templateUrl: './user-dashboard-bar.component.html',
  styleUrls: ['./user-dashboard-bar.component.css']
})
export class UserDashboardBarComponent implements OnInit {
  title = 'No of task vs Status';
  selected = 'Select Project';
  private socket: any;
  // subtitle = 'Bar Chart';
  public barchart: count[] =[ ] ;
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  chart: any;
  private graphData = false;
  constructor( private adminService : AdminService,
    private routes: Router,private config: Config ) {
      this.socket = socketIo(config.siteUrl);
    }
  refresh(){
    
    
     //this.adminService.getchartbar().subscribe(data=>{
      
      // if(data.length <= 0){
      //   this.graphData = true;
      // }
      // console.log(this.graphData)
    // this.barchart= [];
    // data.forEach(elm =>{
      // console.log(elm);
      // if (elm.count != 0){
        this.barchart.push({company:'a' , count:2});
        this.barchart.push({company:'b' , count:2});
        this.barchart.push({company:'a' , count:2});
        this.barchart.push({company:'b' , count:2});
        // this.initSvg();
        // this.initAxis();
        // this.drawAxis();
        // this.drawBars();
        this.drawBar();
     // }
    //});
    
  
   //  console.log(data);
   //});
       
   }


/*_____________________________________BAR CHART____________________________________*/
drawBar(){
  // var mydata = 
  // [
  //   {
  //     "State":"Alaska",
  //     "Population":735132
  //   },
  //   {
  //     "State":"Arizona",
  //     "Population":6626624
  //   }
  // ]
  // d3.select("#pieChart2").selectAll("svg").remove();
  d3.select("#bchart").selectAll("svg").remove();
  var mydata = this.barchart;
  var dataMax = d3.max(mydata, function(d) {return d.count});
  
  var margin = { top: 15, right: 30, bottom: 85, left:45 }
  
  var width = 600 - margin.left - margin.right, 
      height = 290 - margin.top - margin.bottom,
      barWidth = 10;
  var tempColor;  //for mouseover effect
  
  var yScale = d3.scale.linear()
        .domain([0, dataMax])
        .range([0, height]);
  var xScale = d3.scale.ordinal()
        .domain(d3.range(0, mydata.length))
        .rangeBands([0, width],.2);
  
  var vGuideScale = d3.scale.linear()
        .domain([0, dataMax])  //guide numbering will be in the millions
        .range([height, 0]);
  var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(10);
  
  var hAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
  
  var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#333')
        .style('opacity', '.7')
        .style('color', '#fff')
        .style('border-radius', '3px')
  
  ////CHART////
  this.chart = d3.select('#bchart').append('svg')
      .style('background', '#fff')
      
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');
      // chart.exit().remove()
  var bars = this.chart.selectAll('rect')
      .data(mydata).enter()
      .append('rect')
       .style('fill', '#3EAE9A')
      .attr('width', xScale.rangeBand())
      .attr('x', function(d,i) { return xScale(i) })
      .attr('height', 0) 
      .attr('y', height) 
      .attr('class', 'barhvr')
      ////Mouseover effect
      .on('mouseover', function(d) {
        tempColor = this.style.fill;
        d3.select(this)
          // .attr('fill', '#0F7D80 !important')
          // .attr('opacity', .9)
          .attr('cursor', 'pointer')
        tooltip.html("Company: "+d.company)
          .style('left', (d3.event.pageX +10) + 'px')
          .style('top', (d3.event.pageY -20) + 'px')
        tooltip
          .style('opacity', .9)
      })
      .on('mouseout', function(d) {
        d3.select(this)
          // .attr('fill', tempColor)
          // .attr('opacity', 1)
        tooltip.style('opacity', 0)
          .style('left', '0px')
          .style('top', '0px')
      })
        // .on("click", this.mouseclick)  
    // .on('click', (d, i) => {
    //       // this.svg.remove();
    //       this.piechart = []
    //       this.quest[i].ans.forEach((val) => {
    //         // console.log("****************");
            
    //         // console.log(this.quest[i]);
    //         // console.log("****************");

    //       if (val.count != 0) {
    //           this.piechart.push({ name: val.value, percent: val.count,answeredUser:val.answeredUser, ans_type : this.quest[i].ans_type });
    //       }
    //   });
    //   this.setgraph();
    // });
      
  var vGuide = d3.select('svg').append('g')
      vAxis(vGuide); 
      vGuide.attr('transform', 'translate('+ margin.left +','+ margin.top +')')
      vGuide.selectAll('path')
        .style({fill: 'none', stroke: '#000'})
      vGuide.selectAll('line')
        .style({stroke: '#000'})
      vGuide.selectAll('text')
        .attr('font-size', '.8em')
  
  var hGuide = d3.select('svg').append('g')
      hAxis(hGuide);
      hGuide.attr('transform', 'translate('+ margin.left +','+ (height+margin.top) +')')
      hGuide.selectAll('path')
        .style({fill: 'none', stroke: '#000'})
      hGuide.selectAll('line')
        .style({stroke: '#000'})
      hGuide.selectAll('text')
        .attr('transform', 'translate(12,5) rotate(55)')
        .attr('font-size', '12px')
        .style('text-anchor', 'start')
        .text(function(d) {
          return mydata[d].company;
        })
  
      //Label on left of Y axis
      d3.select('svg').append('text')
        .text('No. of Tasks')
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .attr('transform', 'translate(12,'+ ((height+margin.top+margin.bottom)*.45) +') rotate(-90)')
        .attr('font-size', '12px').attr('letter-spacing',"4")
        
      //chart animation
      bars.transition()
        .attr('height', function(d){
          return yScale(d.count);
        })
        .attr('y', function(d){
          return height - yScale(d.count);
        })
        .delay(function(d,i) {
          return i*10
        })
        .duration(800)
        .ease('cubic-out') 
        
      // d3.select('#bchart').append('div').append('p')
      //   .html('* Data from 2013')
      //   .style('font-size', '.6em')
}

/*______________________________________________BAR CHART ENDS____________________________________________*/








  ngOnInit() {
// ---------------------------------Start-------------------------------------------
// Function      : get logged user details
// Params        : 
// Returns       : user details
// Author        : Rinsha
// Date          : 16-1-2018
// Last Modified : 16-1-2018, Rinsha
// Desc          :
// this.adminService.getLoggedUSerDetails().subscribe(info =>{
//   if(info == null || info == ''){
//     this.routes.navigate(['/admin-login']); 
//   }
//   if(info.role == "user"){
//     if(info.delete_status == true || info.block_status == true){
//       this.routes.navigate(['/404']); 
//     }
//     this.routes.navigate(['/survey', info.surveyId]); 
//   }
//   if(info.role == "company"){
//     if(info.delete_status == true || info.block_status == true || info.cmp_status == "Not Verified"){
//       this.routes.navigate(['/clogin']); 
//     }
//     if(info.cmp_status == "Expired"){
//       this.routes.navigate(['/expired']);
//     }
//     if(info.is_profile_completed == false){
//       this.routes.navigate(['/additnInfo', info._id]);
//     }
//     this.routes.navigate(['/dashboard']);
//   }
// });
// ---------------------------------End-------------------------------------------
    this.refresh();
    this.socket.on('new survey created', (data) => {
      
        this.refresh();
       
      });
    // this.initSvg();
    // this.initAxis();
    // this.drawAxis();
    // this.drawBars();
  }

  private initSvg() {
    // this.svg = d3.select("svg");
    // this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    // this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    // this.g = this.svg.append("g")
    //                  .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    // this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    // this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    // this.x.domain(this.barchart.map((d) => d.company));
    // this.y.domain([0, d3Array.max(this.barchart, (d) => d.count)]);
  }

  private drawAxis() {
    // this.g.append("g")
    //       .attr("class", "axis axis--x")
    //       .attr("transform", "translate(0," + this.height + ")")
    //       .call(d3Axis.axisBottom(this.x));
    // this.g.append("g")
    //       .attr("class", "axis axis--y")
    //       .call(d3Axis.axisLeft(this.y))
    //       .append("text")
    //       .attr("class", "axis-title")
    //       .attr("transform", "rotate(-90)")
    //       .attr("y", 6)
    //       .attr("dy", "0.71em")
    //       .attr("text-anchor", "end")
    //       .text("count");
  }

  private drawBars() {
    // this.g.selectAll(".bar")
    //       .data(this.barchart)
    //       .enter().append("rect")
    //       .attr("class", "bar")
    //       .attr("x", (d) => this.x(d.company) )
    //       .attr("y", (d) => this.y(d.count) )
    //       .attr("width", this.x.bandwidth())
    //       .attr("height", (d) => this.height - this.y(d.count) );
  }
}
export interface count {
  company: string,
  count: number
}