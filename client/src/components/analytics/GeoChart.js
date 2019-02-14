import * as React from "react";
import { Chart } from "react-google-charts";
import Typography from "@material-ui/core/Typography";

const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700]
];

export default class GeoChart extends React.Component {
  render() {
    return (
      <div>
        <Typography component="h2" variant="h6" gutterBottom>
          Map of Places
        </Typography>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = data[selection[0].row + 1];
                console.log("Selected : " + region);
              }
            }
          ]}
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={data}
        />
      </div>
    );
  }
}
