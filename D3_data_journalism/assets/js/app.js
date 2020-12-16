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

// Setting Bubble Size Limits
const minRadius = 12;
const maxRadius = 20;

const svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

const chartG = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load CSV Data
d3.csv("assets/data/data.csv").then((data) => {
  console.log(data);

  // Begin Set Scales
  const y = d3
    .scaleLinear()
    .domain([6, d3.max(data.map((d) => parseFloat(d.smokes)))])
    .range([chartHeight, 0]);

  const x = d3
    .scaleLinear()
    .domain([8, d3.max(data.map((d) => parseFloat(d.poverty)))])
    .range([0, chartWidth]);

  const size = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => parseInt(d.income))))
    .range([minRadius, maxRadius]);

  // Begin Define Axis
  const yAxis = d3.axisLeft(y);
  const xAxis = d3.axisBottom(x);

  // Setting up y axis label
  chartG.append("g").call(yAxis);

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

  // Setting up x axis label
  chartG
    .append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

  const labelAreaX = svg
    .append("g")
    .attr(
      "transform",
      `translate(${svgWidth / 2}, ${svgHeight - margin.bottom + 45})`
    );

  labelAreaX.append("text").attr("stroke", "#000000").text("In Poverty (%)");

  const plotArea = chartG.append("g");
  const circleG = plotArea
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr(
      "transform",
      (d) =>
        `translate(${x(parseFloat(d.poverty))}, ${y(parseFloat(d.smokes))})`
    )
    .attr("fill", "#62bbd1");
  // .attr("r", 16)

  circleG.append("circle").attr("r", (d) => size(parseInt(d.income)));

  circleG
    .append("text")
    .text((d) => d.abbr)
    .attr("stroke", "#FFFFFF")
    .attr("fill", "#FFFFFF")
    .attr("dy", ".2em")
    .attr("text-anchor", "middle");
});
