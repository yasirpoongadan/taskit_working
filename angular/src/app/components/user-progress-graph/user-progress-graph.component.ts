import { Component, OnInit } from '@angular/core';
declare var d3: any;
declare var $:any;
@Component({
  selector: 'user-progress-graph',
  templateUrl: './user-progress-graph.component.html',
  styleUrls: ['./user-progress-graph.component.css'],
  inputs: ['containerId', 'progper']
})
export class UserProgressGraphComponent implements OnInit {

  containerId:String;
  progper:any;
    constructor() { }
  
    ngOnInit() {}
    ngAfterViewInit() {
     // console.log(this.containerId);
      var colors = {
        'pink': '#E1499A',
        'yellow': '#f0ff08',
        'green': '#47e495',
        'blue': '#4795e4',
    };
    
    var color = colors.blue;
    
    var radius = 75;
    var border = 20;
    var padding = 10;
    var startPercent = 0;
    var endPercent = this.progper / 100;
    //var endPercent = 0.85;
    
    
    var twoPi = Math.PI * 2;
    var formatPercent = d3.format('.0%');
    var boxSize = (radius + padding) * 2;
    
    
    var count = Math.abs((endPercent - startPercent) / 0.01);
    var step = endPercent < startPercent ? -0.01 : 0.01;
    
    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(radius)
        .outerRadius(radius - border);
    
    var parent = d3.select('div#' + this.containerId);
    
    var svg = parent.append('svg')
        .attr('width', boxSize)
        .attr('height', boxSize);
    
    var defs = svg.append('defs');
    
    var filter = defs.append('filter')
        .attr('id', 'blur');
    
    filter.append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', '0');
    
    var g = svg.append('g')
        .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
    
    var meter = g.append('g')
        .attr('class', 'progress-meter');
    
    meter.append('path')
        .attr('class', 'background')
        .attr('fill', '#ccc')
        .attr('fill-opacity', 0.5)
        .attr('d', arc.endAngle(twoPi));
    
    var foreground = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1)
        .attr('stroke', color)
        .attr('stroke-width', 5)
        .attr('stroke-opacity', 1)
        .attr('filter', 'url(#blur)');
    
    var front = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1);
    
    var numberText = meter.append('text')
        .attr('fill', '#000')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');
    
    function updateProgress(progress) {
        foreground.attr('d', arc.endAngle(twoPi * progress));
        front.attr('d', arc.endAngle(twoPi * progress));
        numberText.text(formatPercent(progress));
    }
    
    var progress = startPercent;
    
    (function loops() {
        updateProgress(progress);
    
        if (count > 0) {
            count--;
            progress += step;
            setTimeout(loops, 50);
        }
    })();
      // var τ = Math.PI; // http://tauday.com/tau-manifesto
      // var arc = d3.svg.arc()
      //     .innerRadius(250)
      //     .outerRadius(0)
      //     .startAngle(0);
      
      // // Draw the thing!
      // drawBadge("#candidscore");
      // updateScore(60, "#candidscore");
      
      // // Pass DOM selector to function, set up Canvas size
      // function drawBadge(svgID) {
      //   var width = 500,
      //     height = 500,
      //     aspect = width / height;
      
      // // Create the SVG container, and apply a transform such that the origin is the
      // // center of the canvas. This way, we don't need to position arcs individually.
      // var svg = d3.select(svgID)
      //     .attr("preserveAspectRatio", "xMidYMid")
      //     .attr("viewBox", "0 0 500 500")
      //     .attr("width", "100%")
      //     .attr("height", "100%")
      //     .append("g")
      //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      
      
      // // Add the background arc, from 0 to 100% (τ).
      // var background = svg.append("path")
      //     .datum({endAngle: 2*τ})
      //     .style("fill", "#f2f2f2")
      //     .attr("transform", "rotate(-90)")
      //     .attr("d", arc);
      
      // // Add the top arc in orange
      // var foreground_top = svg.append("path")
      //     .attr("id", "foreground_top")
      //     .datum({endAngle: 0 * τ})
      //     .style("fill", "#fab923")
      //     .attr("d", arc)
      //     .attr("transform", "rotate(-90)");
      
      // // Add bottom arc in orange
      // var foreground_bottom = svg.append("path")
      //     .attr("id", "foreground_bottom")
      //     .datum({endAngle: 0 * -τ })
      //     .style("fill", "#fab923")
      //     .attr("d", arc)
      //     .attr("transform", "rotate(-90)");
      
      // var trans_circ = svg.append("circle")
      //     .attr("cx", 0)
      //     .attr("cy", 0)
      //     .attr("r", 210)
      //     .attr("fill", "rgba(255,255,255, .25)");
      
      
      // // Create "def" element that will contain our drop shadow filter
      // var defs = svg.append("defs");
      
      // // Create our filter with an id of "#drop-shadow"
      // var filter = defs.append("filter")
      //   .attr("id", "drop-shadow")
      //   .attr("height", "130%");
      
      // // Create our Gaussian Blur with a standard deviation of 8
      // filter.append("feGaussianBlur")
      //   .attr("in", "SourceAlpha")
      //   .attr("stdDeviation", 8)
      //   .attr("result", "blur");
      
      // // Translate the output of Gaussian Blur to (0,0), and store result in var offsetBlur
      // filter.append("feOffset")
      //   .attr("in", "blur")
      //   .attr("dx", 0)
      //   .attr("dy", 0)
      //   .attr("result", "offsetBlur");
      
      
      // // Control the opacity of the actual drop shadow with 'feComponentTransfer and SLOPE'
      // var comptransf = filter.append("feComponentTransfer");
      
      // comptransf.append("feFuncA")
      //   .attr("type", "linear")
      //   .attr("slope", .2);
      
      // // Overlay original SourceGraphic over translated blurred opacity by using feMerge filter ***ORDER IS IMPORTANT***
      // var feMerge = filter.append("feMerge");
      
      // feMerge.append("feMergeNode")
      // /*	.attr("in", "offsetBlur")*/
      // feMerge.append("feMergeNode")
      //   .attr("in", "SourceGraphic");
        
      
      // var white_circ = svg.append("circle")
      //     .attr("cx", 0)
      //     .attr("cx", 0)
      //     .attr("r", 180)
      //     .attr("id", "white_circ")
      //     .style("filter", "url(#drop-shadow)")
      //     .attr("fill", "white");
       
      // var stroke_circ = svg.append("circle")
      //     .attr("cx", 0)
      //     .attr("cy", 0)
      //     .attr("r", 160)
      //     .attr("fill", "none")
      //     .attr("stroke", "rgba(0,0,0,.125")
      //     .attr("stroke-width", "1px");
      
      // var candidlogo = svg.append("g")
      
      // /*  .attr('transform-origin', '0 0')*/
      //   .attr("transform", "translate(-295,-285), scale(1.75)");
      
      //   candidlogo.append("path")
      //    .attr("d", "M134.3,233.2L134.3,233.2c0-3.3,2.6-6.2,6-6.2c2.2,0,3.6,1,4.7,2.2l-0.8,0.8c-1-1-2.2-1.9-3.9-1.9c-2.7,0-4.7,2.2-4.7,5v0c0,2.8,2.1,5.1,4.8,5.1c1.7,0,2.9-0.9,3.9-2l0.8,0.7c-1.2,1.4-2.6,2.3-4.8,2.3 C136.9,239.3,134.3,236.5,134.3,233.2z" )
      //      .attr("fill", "#A7A8AD");
      //    candidlogo.append("path")
      //         .attr("d", "M147.3,235.6L147.3,235.6c0-2.5,2.1-3.9,5.1-3.9c1.6,0,2.8,0.2,3.9,0.5v-0.5c0-2.4-1.4-3.6-3.9-3.6 c-1.4,0-2.6,0.4-3.7,0.9l-0.4-1c1.3-0.6,2.6-1,4.2-1c1.6,0,2.8,0.4,3.7,1.3c0.8,0.8,1.2,1.9,1.2,3.3v7.3h-1.1v-2 c-0.8,1.1-2.3,2.2-4.5,2.2C149.6,239.3,147.3,238,147.3,235.6z M156.3,234.6v-1.3c-1-0.3-2.3-0.5-4-0.5c-2.5,0-3.9,1.1-3.9,2.7v0 c0,1.7,1.6,2.7,3.4,2.7C154.2,238.2,156.3,236.8,156.3,234.6z" )
      //        .attr("fill", "#A7A8AD");
      //   candidlogo.append("path")
      //      .attr("d", "M161.4,227.3h1.1v2.2c0.8-1.4,2.1-2.5,4.2-2.5c3,0,4.7,2,4.7,4.8v7.2h-1.1v-7c0-2.4-1.4-4-3.7-4 c-2.3,0-4.1,1.7-4.1,4.2v6.8h-1.1V227.3z")
      //      .attr("fill", "#A7A8AD");
      //   candidlogo.append("path")
      //     .attr("d", "M174.7,233.2L174.7,233.2c0-3.9,2.9-6.2,5.7-6.2c2.3,0,3.9,1.3,4.8,2.8v-7.6h1.1V239h-1.1v-2.6 c-1,1.5-2.5,2.9-4.8,2.9C177.6,239.3,174.7,237,174.7,233.2z M185.3,233.2L185.3,233.2c0-3.1-2.3-5.1-4.8-5.1 c-2.6,0-4.6,1.9-4.6,5v0c0,3.1,2.1,5.1,4.6,5.1C183,238.2,185.3,236.2,185.3,233.2z")
      //     .attr("fill", "#A7A8AD");
      //   candidlogo.append("path")
      //     .attr("d", "M190.7,222.7h1.4v1.5h-1.4V222.7z M190.8,227.3h1.1V239h-1.1V227.3z")
      //     .attr("fill", "#A7A8AD");
      //     candidlogo.append("path")
      //     .attr("d", "M195.6,233.2L195.6,233.2c0-3.9,2.9-6.2,5.7-6.2c2.3,0,3.9,1.3,4.8,2.8v-7.6h1.1V239h-1.1v-2.6 c-1,1.5-2.5,2.9-4.8,2.9C198.5,239.3,195.6,237,195.6,233.2z M206.2,233.2L206.2,233.2c0-3.1-2.3-5.1-4.8-5.1 c-2.6,0-4.6,1.9-4.6,5v0c0,3.1,2.1,5.1,4.6,5.1C203.9,238.2,206.2,236.2,206.2,233.2z")
      //     .attr("fill", "#A7A8AD");
      
      // var text_score = svg.append("text")
      //   /*.text("50")*/
      //   .attr("id", "scorenum")
      //   .attr("x", 0)
      //   .attr("y", 60)
      //   .attr("font-family", "proxima nova")
      //   .attr("text-anchor", "middle")
      //   .attr("font-weight", "bold")
      //   .attr("font-size", 195)
      //   .attr("fill", "#555555");
      // }
      
      // function arcTween(transition, newAngle) {
      //   transition.attrTween("d", function(d) {
      //     var interpolate = d3.interpolate(d.endAngle, newAngle);
      //     return function(t) {
      //       d.endAngle = interpolate(t);
      //       return arc(d);
      //     };
      //   });
      // }
      
      // function updateScore(score, svgID) {
      //   console.log(score);
      //   var decimalized = score / 100.0;
      //   console.log(decimalized);
      //   var our_svg = d3.select(svgID);
      //   var foreground_top = our_svg.select("path#foreground_top");
      //   var scorenum = our_svg.select("text#scorenum");
      //   var foreground_bottom = our_svg.select("path#foreground_bottom");
      //   scorenum.text(score);
      
      //   foreground_top.transition()
      //       .duration(1500)
      //       .ease("elastic")
      //       .call(arcTween, decimalized * τ );
      //   foreground_bottom.transition()
      //       .duration(1500)
      //       .ease("elastic")
      //       .call(arcTween, decimalized * -τ );
      // }
    }
  
  }