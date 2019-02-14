import React from "react";
import Chart from "react-google-charts";

const data = [
  ["Year", "Services", { role: "style" }],
  ["Jan", 10, "color: blue"],
  ["Feb", 30, "color: blue"],
  ["March", 90, "color: blue"],
  ["April", 100, "color: blue"],
  ["May", 10, "color: blue"],
  ["June", 110, "color: blue"],
  ["July", 20, "color: blue"],
  ["Aug", 10, "color: blue"],
  ["Sept", 14, "color: blue"],
  ["Oct", 16, "color: blue"],
  ["Nov", 22, "color: blue"],
  [
    "Dec",
    28,
    "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"
  ]
];
export default class BarChart extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart chartType="Bar" width="100%" height="400px" data={data} />
      </div>
    );
  }
}
