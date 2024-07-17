import { useEffect, useRef} from "react";
import * as d3 from 'd3';

const width = 290;
const height = 250;

const Donutchart = ({data}) => {
    const chartRef = useRef();
    useEffect(() => {
        if (data.length > 0) {
          drawChart();
        }
      }, [data]);
    
      const drawChart = () => {
        const svg = d3.select(chartRef.current);
        
        const radius = Math.min(width, height) / 2;
    
        svg.selectAll('*').remove(); // Clear previous chart
    
        const g = svg.append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
    
        const color = d3.scaleOrdinal(d3.schemeCategory10);
    
        const pie = d3.pie().value(d => d.close);
    
        const path = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(radius - 70);
    
        const label = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);
    
        const arc = g.selectAll(".arc")
          .data(pie(data))
          .enter().append("g")
          .attr("class", "arc");
    
        arc.append("path")
          .attr("d", path)
          .attr("fill", d => color(d.data.date))
          .attr("stroke","#fff")
          .attr("stroke-width","4")
          .style("opacity",".8");
    
        arc.append("text")
          .attr("transform", d => `translate(${label.centroid(d)})`)
          .attr("dy", "0.35em")
          .text(d => d.data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

      };
  return (
      <svg ref={chartRef} width={width} height={height}></svg>
  )
}

export default Donutchart