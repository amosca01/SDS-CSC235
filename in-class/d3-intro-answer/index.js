

console.log("hi"); 


d3.selectAll('circle')
    .classed('selected', true); 


let arr = [1, 2, 3, 4, 5]; 

d3.select("#container")
    .selectAll("rect")
    .data(arr)
    .join("rect")
    .attr("x", function(d, i) {
        return i*100; 
    })
    .attr("y", 10)
    .attr("width", 50)
    .attr("height", 50); 

let myData = [
    {name: "apple", price: 1.50}, 
    {name: "orange", price: 1.90}, 
    {name: "pear", price: 2.00}
]

let height = 300;
let width = 600;
let margin = 50;

let frame = d3.select("#fruit-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height); 

let linearScale = d3.scaleLinear()
                        .domain([0, 2.00])
                        .range([height - margin, margin]); 

frame.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .call(d3.axisLeft(linearScale)); 

let bandScale = d3.scaleBand()
                    .domain(['apple', 'orange', 'pear'])
                    .range([margin, width-margin])
                    .paddingInner(0.05);

frame.append("g")
        .attr("transform", `translate(0, ${height-margin})`)
        .call(d3.axisBottom(bandScale));

frame.selectAll("rect")
    .data(myData)
    .join("rect")
    .attr("x", function(d, i) {
        return bandScale(d.name); 
    })
    .attr("y", function(d, i) {
        return (linearScale(d.price));
    })
    .attr("width", bandScale.bandwidth())
    .attr("height", function(d, i) {
        return ((height - margin) -linearScale(d.price));
    } ); 





