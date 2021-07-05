//////////////// STEP 1: DEFINE CHART AREA ////////////////

// // Define SVG dimensions
var svgWidth = 960;
// var svgWidth = parseInt(d3.select(".chart").style("width"))
// var svgHeight = svgWidth * .52;
var svgHeight = 500;

// // Define the chart's margins as an object
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
  };

// // Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// // Select scatter, append SVG area to it, and set its dimensions
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 40);


// // Append a group area, then set its margins
 var chartGroup = svg.append("g")
   .attr("transform", `translate(${margin.left}, ${margin.top})`);


//////////////// STEP 2. IMPORT CSV AND SET UP ALL PARAMS //////////////// 

//Initial Params
var chosenXaxis = "poverty";
var chosenYaxis = "healthcare";

//Load csv
var demData = d3.csv("assets/data/data.csv").then((demData) => {
  console.log(demData)

// Parse Data/Cast as numbers
  demData.forEach((data) => {
      data.obesity = +data.obesity;
      data.smokes = +data.smokes; 
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.income = +data.income;
  });

// Define scale functions
    var xLinearScale = xScale(demData, chosenXaxis);
  
  //d3.scaleLinear()
  //    .domain([d3.min(demData , d => parseFloat(d.poverty) * .9), d3.max(demData, d => parseFloat(d.poverty) *1.10)])
  //    .range([0, width]);
// // .domain(20, d3.max(demData, d => d.poverty))


   var yLinearScale = yScale(demData, chosenYaxis);
  
  //d3.scaleLinear()
  // .domain([6, d3.max(demData, d => d.healthcare)])
  // .range([height, 0]);

// Define axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

//////////////// STEP 3: APPEND CHART AND DATA ////////////////

//Append bottom and left axes to the chart
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.call(tooltip);

  //Create circles and add tooltip
  var circlesGroup = chartGroup.selectAll("circle")
    .data(demData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXaxis]))
    .attr("cy", d => yLinearScale(d[chosenYaxis]))
    .attr("r", "18")
    .attr("stroke-width", "1")
    .classed("stateCircle", true)
    .attr("opacity", 0.5)
    .on('mouseover', tooltip.show)
    .on('mouseout', tooltip.hide);

  // Create group for three y-axes labels

var yLabelsGroup = yLabelsGroup.append("g");

var healthcareLabel = yLabelsGroup.append("text") 
//chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("value", "healthcare") //value to grab for event listener
  .attr("y", 0 - margin.left -10) 
  .attr("x", 0 - (height / 2)) 
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text("Lacks Healthcare (%)");

var obeseLabel = yLabelsGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("value", "obesity") //value to grab for event listener
  .attr("y", 0 - margin.left -10) 
  .attr("x", 0 - (height / 2)) 
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text("Obese (%)");

var smokesLabel = yLabelsGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("value", "smokes")
  .attr("y", 0 - margin.left -10)
  .attr("x", 0 - (height /2))
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text("Smokes (%)");



  // chartGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)//may want to make this responsive
//   .attr("class", "axisText")
//   .text("Poverty");
    
// Add text to each circle
var circlesText = chartGroup.selectAll("text")
  .data(demData)
  .enter()
  .append("text")
  .text(d => d.abbr)
  .attr("x", d => xLinearScale(d.poverty))
  .attr("y", d => yLinearScale(d.healthcare))
  .style("text-anchor", "middle")
  console.log(circlesText);
 });

// //////////////// STEP 4: ADD INTERACTIVITY ////////////////

// // Initialize tool tip
// var tooltip = d3.tip()
//   .attr("class", 'd3-tip')
//   .offset([20, 50])
//   .html(d => `${d[chosenXaxis]}<br> ${d[chosenYaxis]}`);



