import React, { useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { select, selectAll } from "d3-selection";

const App: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    console.log(select(svgRef.current));

    // select(svgRef.current)
    //   .append("rect")
    //   .attr("width", 100)
    //   .attr("height", 100)
    //   .attr("fill", "blue")

    selectAll("rect")
      .attr("width", 100)
      .attr("height", 100)
      .attr("fill", "blue")
      .attr("x", (_, i) => i * 110);
  });

  return (
    <div>
      <svg ref={svgRef}>
        <rect />
        <rect />
        <rect />
      </svg>
    </div>
  );
};

export default App;
