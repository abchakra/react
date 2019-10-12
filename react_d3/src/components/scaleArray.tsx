import React, { useRef, useEffect, useState } from "react";
import "./App.css";

import { select, Selection } from "d3-selection";

import { scaleLinear, scaleBand } from "d3-scale";

import { max } from "d3-array";
const data = [
  { units: 15000, color: "purple" },

  { units: 4000, color: "red" },

  { units: 8000, color: "blue" },

  { units: 11000, color: "cyan" },

  { units: 1000, color: "green" },

  { units: 5000, color: "orange" },

  { units: 8000, color: "grey" },

  { units: 15000, color: "daryblue" }
];
const App: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const maxValue = max(data, d => d.units);
  const y = scaleLinear()
    .domain([0, maxValue!])
    .range([0, 500]);

  const x = scaleBand()
    .domain(data.map(d => d.color))
    .range([0, 1400])
    .paddingInner(0.05)
    .paddingOuter(0.7);

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      selection
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", x.bandwidth)
        .attr("height", d => y(d.units))
        .attr("fill", d => d.color)
        .attr("x", d => {
          const xValue = x(d.color);
          if (xValue) {
            return xValue;
          }
          return null;
        });
    }
  }, [selection]);

  return (
    <div>
      <svg ref={ref} width={1400} height={900}></svg>
    </div>
  );
};

export default App;
