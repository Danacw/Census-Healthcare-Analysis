//////////////// STEP 1: DEFINE CHART AREA ////////////////

// // Define SVG dimensions
var svgWidth = 960;
var svgHeight = 500;

// // Define the chart's margins as an object
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
  };

// // Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// // Select scatter, append SVG area to it, and set its dimensions
var svg = d3
  .select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 40);


// // Append a group area, then set its margins
 var chartGroup = svg.append("g")
   .attr("transform", `translate(${margin.left}, ${margin.top})`);

//////////////// STEP 2. IMPORT CSV AND SET UP ALL PARAMS //////////////// 

//Load csv
var demData = d3.csv("assets/data/data.csv").then((demData) => {
  console.log(demData)

// Define all params
  demData.forEach((data) => {
      data.obesity = +data.obesity;
      data.smokes = +data.smokes; 
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.income = +data.income;
  });

// Define scale functions
  var xLinearScale = d3.scaleLinear()
    .domain(20, d3.max(demData, d => d.poverty))
    .range([0, chartWidth])
    .nice();

  var yLinearScale = d3.scaleLinear()
  .domain([6, d3.max(demData, d => d.healthcare)])
  .range([chartHeight, 0])
  .nice();

// Define axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

//////////////// STEP 3: APPEND CHART AND DATA ////////////////

//Append bottom and left axes to the chart
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  //Create circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(demData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "15")
  .attr("stroke-width", "1")
  .classed("stateCircle", true)
  .attr("opacity", 0.75);
});



