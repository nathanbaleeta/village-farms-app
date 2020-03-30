import React, { Component } from "react";
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
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class FarmPerformanceReport extends Component {
  constructor() {
    super();
    this.state = {
      chartOptions: {
        title: {
          text: "Farm Peformance Report"
        },
        xAxis: {
          categories: ["Daily", "Weekly", "Monthly", "Quartely", "Total"]
        },
        labels: {
          items: [
            {
              html: "Advances vs Procurement Chart",
              style: {
                left: "50px",
                top: "18px",
                color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color) ||
                  "black"
              }
            }
          ]
        }
      }
    };
  }
  componentDidMount() {
    this.setState({
      chartOptions: {
        series: [
          {
            type: "column",
            name: "Jane",
            data: [3, 2, 1, 3, 4]
          },
          {
            type: "column",
            name: "John",
            data: [2, 3, 5, 7, 6]
          },
          {
            type: "column",
            name: "Joe",
            data: [4, 3, 3, 9, 4]
          },
          {
            type: "spline",
            name: "Average",
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[3],
              fillColor: "white"
            }
          },
          {
            type: "pie",
            name: "Total consumption",
            data: [
              {
                name: "Jane",
                y: 13,
                color: Highcharts.getOptions().colors[0] // Jane's color
              },
              {
                name: "John",
                y: 23,
                color: Highcharts.getOptions().colors[1] // John's color
              },
              {
                name: "Joe",
                y: 19,
                color: Highcharts.getOptions().colors[2] // Joe's color
              }
            ],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
              enabled: false
            }
          }
        ]
      }
    });
  }
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

FarmPerformanceReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FarmPerformanceReport);
