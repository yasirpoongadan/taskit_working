import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AdminService } from './../../services/admin.service'
var $:any;
declare var d3: any;
@Component({
  selector: 'app-admin-dashboard-bar',
  templateUrl: './admin-dashboard-bar.component.html',
  styleUrls: ['./admin-dashboard-bar.component.css']
})
export class AdminDashboardBarComponent implements OnInit {
  // public barchart: count[] =[ ] ;
  graphData = true;
  chart: any;
  title = '';
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  exist = false;
  // years = [];
  // offensesByYear = [];
  // offenseNames = [
  //   "count",
  // ];
  constructor(private superAdminService : AdminService) { }

  ngOnInit() {
    this.refresh();
    this.bargraph();
  }

  getGraphData(){
    // this.superAdminService.getBarDataforAdminDashboard().subscribe(data=>{
    //   console.log(data)
    //   if(data.length>0){
    //     data.forEach(element => {
    //       this.years.push(element.cmp_name)
    //       this.offensesByYear.push({"count":element.tbl_projects.length})
    //     });
    // this.bargraph()
        
    //   }
    // })
    
  }

  bargraph(){
    
    // const years = ["On Hold", "Completed","In Progress","New-Yet to Star"];
    // const offensesByYear = [
    //   {
    //     "count": 6,
    //    },
    //   { "count":  5,
    //   },
    //   {
    //     "count": 8,
    //    },
    //   { "count": 12,
    //   },
    // ];
    const offenseNames = [
      "count",
    ];
    const years = []
        const offensesByYear = []

    this.superAdminService.getBarDataforAdminDashboard().subscribe(data=>{
      if(data.length>0){
      // console.log("data")
        
        this.exist = true;
        data.forEach(element => {
          if(element.tbl_projects.length>0){
            years.push(element.cmp_name)
            offensesByYear.push({"count":element.tbl_projects.length})
          }
          
        });
        const generateClassStr = str => {
          return str.replace(/\s+/g, '-').toLowerCase();
        }
    // console.log(offensesByYear)
    // console.log(years)
        let n     = offenseNames.length, // number of layers
            m     = offensesByYear.length, // number of samples per layer
            stack = d3.stack().keys(offenseNames);
    
        let layers = stack(offensesByYear); // calculate the stack layout
        
        layers.forEach(function(d, i) {
          // add keys to every datapoint
          d.forEach(function(dd, j) {
            dd.year = years[j];
            dd.offenseName = offenseNames[i];
            dd.class = generateClassStr(dd.offenseName);
            dd.value =  dd.data[dd.offenseName]
          });
        });
    
        let yStackMax = d3.max(layers, function(layer) {
            return d3.max(layer, function(d) {
              return d[1];
            });
          });
        let margin = { top: 50, right: 15, bottom: 80, left: 50 },
          fullChartWidth = 560, 
            fullChartHeight = 400,
            
          width  = fullChartWidth  - margin.left - margin.right,
          height = fullChartHeight - margin.top  - margin.bottom;
    
        d3.select("#containerId")
          .style("width",  fullChartWidth)
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
        let color = ["#beaed4", "#7fc97f", "#fdc086"]
  
        let svg = d3
          .select("#containerId")
          .append("svg")
          .attr("width", width + margin.left + margin.right + 20)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + (margin.left + 20) + "," + margin.top + ")");
          let mycount = 1;  
        let layer = svg
          .selectAll(".layer")
          .data(layers)
          .enter()
          .append("g")
          .attr("class", "layer")
          .style("fill",(d, i)=>{
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
    
    
        let rect = layer
          .selectAll(".bar")
          .data(function(d) {
            return d;
          })
          .enter()
          .append("rect")
      // .attr("class", d => generateClassStr(d.offenseName) + " bar")
          .attr("x", function(d) {
            return x(d.year);
          })
          .attr("y", height)
          .attr("width", x.bandwidth() )
          .attr("height", 0)
          .on("mouseover", d => {
            d3.select(this)
          // .filter(dd => dd.class != d.class)
        //  .style("opacity", 0.6)
          });
    
          rect
            .transition()
            .delay(function(d, i) {
              return i * 10;
            })
            .attr("y", function(d) {
              return y(d[1]);
            })
            .attr("height", function(d) {
              return y(d[0]) - y(d[1]);
            });
          
          svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height  +")")
              .call(d3.axisBottom(x));
          svg.selectAll('.tick text').attr("transform","translate(10) rotate(42 -17 31)");
          svg.append("g")
          .call(d3.axisLeft(y));
          // text label for the y axis    
            svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left - 30)
          .attr("x", 0 - (height / 2))
          .attr("dy", "3em")
          .style("text-anchor", "middle")
          .text("No of Projects"); 
      }else{
        // console.log("hhh")
        // this.empty = true;
      }
    })
    // console.log(this.years)
    // console.log(this.offensesByYear)
    // const years = ["On Hold", "Completed","In Progress","New-Yet to Star"];
    // const offensesByYear = [
    //   {
    //     "count": 5,
    //    },
    //   { "count":  10,
    //   },
    //   {
    //     "count": 8,
    //    },
    //   { "count": 6,
    //   },
    // ];
    // console.log(years)
    // console.log(offensesByYear)
    
  }
  refresh(){
    
    
//     this.superAdminService.getBarDataforAdminDashboard().subscribe(data=>{
//      console.log(data.length)
//      if(data.length <= 0){
//      }
//      // console.log(this.graphData)
//    this.barchart= [];
//    data.forEach(elm =>{
//     //  console.log(elm);
//      if (elm.tbl_projects.length != 0){
//       this.graphData = true;
       
//        this.barchart.push({label: elm.cmp_name, value:(elm.tbl_projects.length)});
//        // this.initSvg();
//        // this.initAxis();
//        // this.drawAxis();
//        // this.drawBars();
//      }
//    });
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
//    this.barchart.push({label: "elm.cmp_name", value:5});
   
//    this.drawBar();
//   //  console.log(data);
//   });
      
//   }



//   /*_____________________________________BAR CHART____________________________________*/
// drawBar(){

//   var bardata = [];
// for (var i = 0; i < 100; i++) {
//   bardata.push(Math.round(Math.random()*30) +1)
// };

// var height = 500,
// 		width = 800		
	
// var yScale = d3.scaleLinear()
//     .domain([0, d3.max(bardata)])
//     .range([0, height]);
	
// var xScale = d3.scaleBand()
//     .domain(d3.range(0, bardata.length))
//     .range([0, width]);
	
// var colors = d3.scaleLinear()
//     .domain([0, d3.max(bardata)])
//     .range(['#ffeb3b', '#d20f53']);
	
// var tooltip = d3.select('body').append('div')
// 		.style('position', 'absolute')
// 		.style('background', '#fff')
// 		.style('padding', '5px')
// 		.style('border', '1px #000 solid')
// 		.style('border-radius', '5px')
// 		.style('opacity', '0');
	
// var myChart = d3.select('#chart').append('svg')
// 					.attr('width', width)
// 					.attr('height', height)
// 					.style('background', '#fdf6e3')
// 					.selectAll('rect').data(bardata)
// 					.enter().append('rect')
// 						.style('fill', colors)
// 						.attr('width', xScale.bandwidth())
// 						.attr('height', 0)
// 						.attr('x', function(d,i) {
// 							return (i * xScale.bandwidth()) + 1;
// 						})
// 						.attr('y', height)

// 				.on('mouseover', function(d) {
//           d3.select(this).style('opacity', '0.3')	
// 					tooltip.style('opacity', '1').html(d)
// 						.style('left', (d3.event.pageX)+'px')
// 						.style('top', (d3.event.pageY)+'px')	
// 				})
// 				.on('mouseout', function(d) {
//           d3.select(this).style('opacity', '1')
// 					tooltip.style('opacity', '0')
// 				});

// 	myChart.transition()
// 		.attr('height', function(d){
// 			return yScale(d);
// 		})
// 		.attr('y', function(d){
// 			return height - yScale(d);
// 		})
// 		.duration(800)
// 		.delay(function(d,i) {
// 			return i * 20;
// 		});
}

/*______________________________________________BAR CHART ENDS____________________________________________*/
}
// export interface count {
//   company: string,
//   count: number
// }