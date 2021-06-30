////// STEP 1: LOAD DATA FROM CSV //////
var demData = d3.csv("assets/data/data.csv").then((demData) => {
    console.log(demData)


////// STEP 1: DEFINE CHART AREA //////

// // Define SVG dimensions
var svgWidth = 960;
var svgHeight = 500;

// // Define the chart's margins as an object
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  };

// // Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// // Select body, append SVG area to it, and set its dimensions
var svg = d3
  .select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 40);


// // Append a group area, then set its margins
 var chartGroup = svg.append("g")
   .attr("transform", `translate(${margin.left}, ${margin.top})`);

////// STEP 3. SET UP ALL PARAMS //////  

// // Define initial Params
 let chosenXaxis = "data.poverty";
 let chosenYaxis = "data.healthcare";

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
var xScale = d3.scaleLinear()
  .domain(d3.extent(demData, d => d.poverty))
  .range([0, chartWidth])
  .nice();

  var yScale = d3.scaleLinear()
  .domain([6, d3.max(demData, d => d.healthcare)])
  .range([chartHeight, 0])
  .nice();

// Define axis functions
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

//////STEP 4: APPEND CHART AND DATA //////

//Append an SVG group element and the bottom and left axes to the SVG area 
chartGroup.append("g")
  .classed("axis", true)
  .call(yAxis);

chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);
  
});



