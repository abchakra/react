import React, { useRef, useEffect, useState } from "react";
import "./App.css";

import { select, Selection } from "d3-selection";

const data = [
  { units: 150, color: "purple" },

  { units: 40, color: "red" },

  { units: 80, color: "blue" },

  { units: 110, color: "cyan" },

  { units: 10, color: "green" },

  { units: 50, color: "orange" },

  { units: 80, color: "grey" },

  { units: 150, color: "daryblue" }
];
const App: React.FC = () => {
  const ref = useRef(null);
  const [selection, setSelection] = useState<null | Selection<
    any,
    unknown,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      const rects = selection
        .selectAll("rect")
        .data(data)
        .attr("width", 100)
        .attr("height", d => d.units)
        .attr("fill", d => d.color)
        .attr("x", (_, i) => i * 100);

      rects
        .enter()
        .append("rect")
        .attr("width", 100)
        .attr("height", d => d.units)
        .attr("fill", d => d.color)
        .attr("x", (_, i) => i * 100);
    }
  }, [selection]);

  return (
    <div>
      <svg ref={ref} width={1400}>
        <rect />
        <rect />
        <rect />
      </svg>
    </div>
  );
};

export default App;
