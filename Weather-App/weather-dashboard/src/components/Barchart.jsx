import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
const Barchart = ({ data }) => {
  const chartRef = useRef();
  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const svg = d3.select(chartRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    svg.selectAll("*").remove(); // Clear previous chart

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.close)])
      .nice()
      .range([height, 0]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")))
      .selectAll("text")
      .style("fill", "rgb(247, 165, 72)");

    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "rgb(247, 165, 72)");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.date))
      .attr("y", (d) => y(d.close))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.close))
      .attr("fill", "rgb(84, 72, 248)");
  };

  return (
    <>
      <svg ref={chartRef} width={400} height={400}></svg>
      
    </>
  );
};

export default Barchart;
