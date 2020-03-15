import React from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

//import firebase from "../common/firebase";
//import * as moment from "moment";

import HighchartsReact from "highcharts-react-official";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class Demo2 extends React.Component {
  constructor() {
    super();
    this.state = {
      chartOptions: {
        chart: {
          zoomType: "xy"
        },
        title: {
          text: "Average Monthly Temperature and Rainfall in Tokyo"
        },
        subtitle: {
          text: "Source: WorldClimate.com"
        },
        xAxis: [
          {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            crosshair: true
          }
        ],
        yAxis: [
          {
            // Primary yAxis
            labels: {
              format: "{value}°C",
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: "Temperature",
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            }
          },
          {
            // Secondary yAxis
            title: {
              text: "Rainfall",
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            labels: {
              format: "{value} mm",
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            opposite: true
          }
        ],
        tooltip: {
          shared: true
        },
        legend: {
          layout: "vertical",
          align: "left",
          x: 120,
          verticalAlign: "top",
          y: 100,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            "rgba(255,255,255,0.25)"
        },
        series: [
          {
            name: "Rainfall",
            type: "column",
            yAxis: 1,
            data: [
              49.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ],
            tooltip: {
              valueSuffix: " mm"
            }
          },
          {
            name: "Temperature",
            type: "spline",
            data: [
              7.0,
              6.9,
              9.5,
              14.5,
              18.2,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6
            ],
            tooltip: {
              valueSuffix: "°C"
            }
          }
        ]
      }
    };
  }
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    const { chartOptions } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

Demo2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Demo2);
