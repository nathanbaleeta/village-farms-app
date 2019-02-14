import React from "react";
import Chart from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram

const data = [
  ["Year", "Procurements", "Advances"],
  ["October", 1000, 400],
  ["November", 1170, 460],
  ["December", 660, 1120],
  ["January", 1030, 540]
];
const options = {
  title: "Village Farms Performance",
  curveType: "function",
  legend: { position: "bottom" }
};
export default class LineChart extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    );
  }
}
