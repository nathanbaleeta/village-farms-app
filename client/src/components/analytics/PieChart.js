import React from "react";
import Chart from "react-google-charts";

const data = [
  ["Gender", "Count by gender"],
  ["Male", 100],
  ["Female", 72]
  // CSS-style declaration
];
const options = {
  title: "Total Number Registered",
  pieHole: 0.4,
  is3D: true
};

export default class PieChart extends React.Component {
  render() {
    return (
      <div>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    );
  }
}
