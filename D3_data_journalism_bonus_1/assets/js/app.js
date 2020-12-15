// // Set SVG Area
// const svgHeight = 600;
// const svgWidth = 800;

// // Set Margins
// const margin = {
//   top: 50,
//   right: 50,
//   bottom: 100,
//   left: 100,
// };

// // Defining Chart area inside of SVG
// const chartHeight = svgHeight - margin.top - margin.bottom;
// const chartWidth = svgWidth - margin.left - margin.right;

// // Setting Bubble Size Limits
// // const minRadius = 12;
// // const maxRadius = 20;

// const svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);

// const chartG = svg
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Load CSV Data
// d3.csv("assets/data/data.csv").then((data) => {
//   console.log(data);

//   // Begin Set Scales
//   const y = d3
//     .scaleLinear()
//     .domain([6, d3.max(data.map((d) => parseFloat(d.smokes)))])
//     // invert axis to avoid having to do d3 axis calculations
//     .range([chartHeight, 0]);

//   const x = d3
//     .scaleLinear()
//     .domain([8, d3.max(data.map((d) => parseFloat(d.poverty)))])
//     .range([0, chartWidth]);

//   // const size = d3
//   //   .scaleLinear()
//   //   .domain(d3.extent(data.map((d) => parseInt(d.income))))
//   //   .range([minRadius, maxRadius]);

//   // Begin Define Axis
//   const yAxis = d3.axisLeft(y);
//   const xAxis = d3.axisBottom(x);

//   // Setting up y axis label
//   chartG.append("g").call(yAxis);

//   const labelAreaY = svg
//     .append("g")
//     .attr(
//       "transform",
//       `translate( ${svgWidth - margin.left - 645}, ${svgHeight / 2})`
//     );

//   labelAreaY
//     .append("text")
//     .attr("stroke", "#000000")
//     .attr("transform", "rotate(-90)")
//     .text("(%) Smokers");

//   // Setting up x axis label
//   chartG
//     .append("g")
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(xAxis);

//   const labelAreaX = svg
//     .append("g")
//     .attr(
//       "transform",
//       `translate(${svgWidth / 2}, ${svgHeight - margin.bottom + 45})`
//     );

//   labelAreaX.append("text").attr("stroke", "#000000").text("In Poverty (%)");

//   // const plotArea = chartG.append("g");
//   const circleG = chartG.selectAll("circle")
//     // .selectAll("g")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", d =>x(parseFloat(d.poverty)))
//     .attr("cy", d =>y(parseFloat(d.smokes)))
//     .attr("fill", "#62bbd1")
//     .attr("r", 12);

//   // circleG.append("circle").attr("r", (d) => size(parseInt(d.income)));

//   circleG.selectAll
//     .append("text")
//     .text((d) => d.abbr)
//     .attr("stroke", "#FFFFFF")
//     .attr("fill", "#FFFFFF")
//     .attr("dy", ".2em")
//     .attr("text-anchor", "middle");
// });

// With Labels Begins Here
// Set SVG Area
const svgHeight = 600;
const svgWidth = 800;

// Set Margins
const margin = {
  top: 50,
  right: 50,
  bottom: 100,
  left: 100,
};

// Defining Chart area inside of SVG
const chartHeight = svgHeight - margin.top - margin.bottom;
const chartWidth = svgWidth - margin.left - margin.right;

// // Setting Bubble Size Limits
// const minRadius = 12;
// const maxRadius = 20;

const svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

const chartG = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Setting up function to hadle x axis label selection
const xScale = (data, selection) =>{
  let selectionData
  if (selection === "In Poverty (%)"){
    selectionData = data.map(d => parseFloat(d.poverty))
  } else if (selection === "Age"){
    selectionData = data.map(d => parseFloat(d.age))
  }
  console.log(selectionData)

  const x = d3.scaleLinear()
    .domain ([d3.min(selectionData) * .8, d3.max(selectionData) * 1.2])
    .range  ([0, chartWidth])

    return(x)
}
// Function to create new axis when x axis label is clicked
const renderXaxis = (xAxisG, newxScale) => {
  xAxis = d3.axisBottom(newxScale)
  xAxisG
  .transition()
  .duration(1000)
  .call(xAxis)
}

const renderCircles = (circleG, newxScale, selection) => {
  
  let selectionDataKey

  if (selection === "In Poverty (%)"){
    selectionDataKey = "poverty"
  } else if (selection === "Age"){
    selectionDataKey = "age"
  }
  circleG
  .transition()
  .duration(1000)
  .attr("cx", d => newxScale(d[selectionDataKey]))
}
// Load CSV Data
d3.csv("assets/data/data.csv").then((data) => {
  console.log(data);

  // Begin Set Scales
  const y = d3
    .scaleLinear()
    .domain([6, d3.max(data.map((d) => parseFloat(d.smokes)))])
    // invert axis to avoid having to do d3 axis calculations
    .range([chartHeight, 0]);

  const x = d3
    .scaleLinear()
    .domain([8, d3.max(data.map((d) => parseFloat(d.poverty)))])
    .range([0, chartWidth]);

   

  // const size = d3
  //   .scaleLinear()
  //   .domain(d3.extent(data.map((d) => parseInt(d.income))))
  //   .range([minRadius, maxRadius]);

  // Begin Define Axis
  const yAxis = d3.axisLeft(y);
  const xAxis = d3.axisBottom(x);

  const xAxisG = chartG
  .append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

  chartG
  .append("g").
  call(yAxis);

  // Setting up y axis label
  const labelAreaY = svg
    .append("g")
    .attr(
      "transform",
      `translate( ${svgWidth - margin.left - 645}, ${svgHeight / 2})`
    );

  labelAreaY
    .append("text")
    .attr("stroke", "#000000")
    .attr("transform", "rotate(-90)")
    .text("(%) Smokers");

  // Setting up x axis labels
  const labelAreaX = svg
    .append("g")
    .attr(
      "transform",
      `translate(${svgWidth / 2}, ${svgHeight - margin.bottom + 45})`
    );

  labelAreaX
    .append("text")
    .attr("stroke", "#000000")
    .text("In Poverty (%)")    

  labelAreaX
    .append("text")
    .attr("stroke", "#000000")
    .text("Age")
    .attr("dy", 20)
    .attr("dx", 30)
    
  labelAreaX.selectAll("text")
    .on("click", function() {      
      const selection = d3.select(this).text()
      console.log(selection)
      newxScale = xScale(data, selection)
      renderXaxis(xAxisG, newxScale)
      renderCircles(circleG, newxScale, selection)
    });

  const plotArea = chartG.append("g");
  const circleG = plotArea
    .selectAll("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d =>x(parseFloat(d.poverty)))
    .attr("cy", d =>y(parseFloat(d.smokes)))
    .attr("fill", "#62bbd1")
    .attr("r", 12);

  // circleG.append("circle").attr("r", (d) => size(parseInt(d.income)));

  circleG
    .append("text")
    .text((d) => d.abbr)
    .attr("stroke", "#FFFFFF")
    .attr("fill", "#FFFFFF")
    .attr("dy", ".2em")
    .attr("text-anchor", "middle");
    });

    