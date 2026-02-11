
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

    // Add axes  
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

    // set up a brush for brushing and linking 
    brush = d3.brush()
                .extent([ // define what can be brushed 
                    [d3.min(xScale1.range()), d3.min(yScale1.range())],
                    [d3.max(xScale1.range()), d3.max(yScale1.range())]
                ])
                .on("brush end", (e) => { // event handler 
                    if (e.selection === null) {
                        circles = d3.selectAll('circle'); 
                        circles = circles["_groups"][0]; 
                        circles.forEach(c => { c.classList.remove('highlight'); })
                    } else {
                        const [[xMin, yMin], [xMax, yMax]] = e.selection; 
                        data.map((d, i) => {
                            
                            selector = "._" + i;
                            sel =  d3.selectAll(selector); 
                            circles = sel["_groups"][0] // for each data in selection, find circles
                        
                            if (xMin <= xScale1(d[x1]) && xMax >= xScale1(d[x1]) &&
                                yMin <= yScale1(d[y1]) && yMax >= yScale1(d[y1])) {
                                circles.forEach(c => { c.classList.add('highlight'); }) // if circle is in selection, highlight
                            } else {
                                circles.forEach(c => { c.classList.remove('highlight'); })
                            }
                        })
                    }
                }); 

    frame1.append("g")
        .call(brush); 

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
            })
            .attr("class", (d, i) => {return "_" + i}); 

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
            })
            .attr("class", (d, i) => {return "_" + i});  
}

// request data 
d3.csv("penguins.csv")
    .then(function(data) {
        update(data); 
    }); 


