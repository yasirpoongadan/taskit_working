import { Component, OnInit } from '@angular/core';
declare var d3: any;
declare var $:any;
@Component({
  selector: 'user-bar-graph',
  templateUrl: './user-bar-graph.component.html',
  styleUrls: ['./user-bar-graph.component.css'],
  inputs: ['containerId','actual','planning']
})
export class UserBarGraphComponent implements OnInit {

  containerId = '';
  actual = '';
  planning = '';
  constructor() { }

  // ngOnInit() {
    ngOnInit() {}
    ngAfterViewInit() {
  
    const offenseNames = [
      "Hours",
     
    ];
    const years = ["Planned", "Actual"];
    const offensesByYear = [
      {
        "Hours": this.planning,
       },
      { "Hours": this.actual,
      },
    ];
    
    const generateClassStr = str => {
      return str.replace(/\s+/g, '-').toLowerCase();
    }
    
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
    let margin = { top: 70, right: 15, bottom: 40, left: 50 },
      fullChartWidth = 300, 
        fullChartHeight = 150,
        
      width  = fullChartWidth  - margin.left - margin.right,
      height = fullChartHeight - margin.top  - margin.bottom;
    
    d3.select("#" + this.containerId)
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
      .select("#" + this.containerId)
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
    
      var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      // .style("visibility", "hidden")
      .style("background", "#96A7B9")
      .style("display", "none")
      .text("a simple tooltip");

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
      .on("mouseover", function(d){
        tooltip.text("Total "+ d.year+ " Hour: "+d.data.Hours +" Hr"); return tooltip.style("display", "block");})
      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("display", "none");});
    
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
      .attr("transform", "translate(0," + height  +")")
        .call(d3.axisBottom(x));
    
    
    
  }

}