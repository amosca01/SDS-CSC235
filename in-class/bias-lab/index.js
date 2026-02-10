
// set up SVG to hold the visualization 
const margin = 100; 
const frameWidth = 1500; 
const frameHeight = 700; 
const visWidth = (frameWidth - 3*margin) / 2; 
const visHeight = (frameHeight - 2*margin); 

let frame = d3.select("#frame")
                .append("svg")
                    .attr("width", frameWidth)
                    .attr("height", frameHeight);

let frame1 = frame.append('g')
                    .attr("transform", "translate(" + margin + "," + margin + ")"); 
let frame2 = frame.append('g')
                    .attr("transform", "translate(" + (margin*2 + visWidth) + "," + margin + ")"); 

// to plot
let x1 = 'Culmen Length (mm)'
let y1 = 'Culmen Depth (mm)'

let x2 = 'Flipper Length (mm)'
let y2 = 'Body Mass (g)'

// plot function 
function update(data) {

    // set up axes
    let xScale1 = d3.scaleLinear()
                    .domain([0, d3.max(data.map(d => d[x1]))]).nice()
                    .range([0, visWidth]);
    let xScale2 = d3.scaleLinear()
                    .domain([0, d3.max(data.map(d => d[x2]))]).nice()
                    .range([0, visWidth]); 
    let yScale1 = d3.scaleLinear()
                    .domain([0, d3.max(data.map(d => d[y1]))]).nice()
                    .range([visHeight, 0]); 
    let yScale2 = d3.scaleLinear()
                    .domain([0, d3.max(data.map(d => d[y2]))]).nice()
                    .range([visHeight, 0]);
    
    let xAxis1 = d3.axisBottom(xScale1); 
    let xAxis2 = d3.axisBottom(xScale2); 
    let yAxis1 = d3.axisLeft(yScale1); 
    let yAxis2 = d3.axisLeft(yScale2); 

    // Add axes to vis 
    // scatter 1
    frame1.append('g')
            .attr('transform', 'translate(0,' + (visHeight) + ')')
            .call(xAxis1)
    frame1.append("text")             
            .attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')')
            .style("text-anchor", "middle")
            .text(x1);
             
    frame1.append('g')
            .call(yAxis1); 
    frame1.append("text")   
            .attr("transform", "rotate(-90)")          
            .attr('x', -visHeight/2)
            .attr('y', -margin/2)
            .style("text-anchor", "middle")
            .text(y1);

    // scatter 2
    frame2.append('g')
            .attr('transform', 'translate(0,' + (visHeight) + ')')
            .call(xAxis2); 
    frame2.append("text")             
            .attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')')
            .style("text-anchor", "middle")
            .text(x2);

    frame2.append('g')
            .call(yAxis2); 
    frame2.append("text")   
            .attr("transform", "rotate(-90)")          
            .attr('x', -visHeight/2)
            .attr('y', -margin/2)
            .style("text-anchor", "middle")
            .text(y2);

    // set up color scale for species 
    let speciesScale = d3.scaleOrdinal()
                            .domain(data.map(d => d['Island']))
                            .range(['#66c2a5','#fc8d62','#8da0cb']); 

    // add points
    let dot1 = frame1.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
        .append("circle")
            .attr("cx", function (d) { 
                return xScale1(d[x1]); 
            })
            .attr("cy", function (d) { 
                return yScale1(d[y1]); 
            })
            .attr("r", 2)
            .style("fill", function (d) { 
                return speciesScale(d['Island']) 
            }); 


    let dot2 = frame2.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
        .append("circle")
            .attr("cx", function (d) { 
                return xScale2(d[x2]); 
            })
            .attr("cy", function (d) { 
                return yScale2(d[y2]); 
            })
            .attr("r", 2)
            .style("fill", function (d) { 
                return speciesScale(d['Island']) 
            }); 

    // brushing
    frame1.call(d3.brush().on("start brush end", function(e) {
        if (e.selection) {
 
            let [[x0, y0], [x1, y1]] = e.selection;
            dot1['_groups'][0].forEach(function(currDot) {
                // todo 
                console.log(d3.select(currDot).attr('cx')); 
            })
            
        } else {
        //     dot1.style("stroke", "steelblue");
        }
    })) 
}

// request data 
d3.csv("penguins.csv")
    .then(function(data) {
        update(data); 
    }); 


