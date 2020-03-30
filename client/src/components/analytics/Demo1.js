import React, { Component } from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import firebase from "../common/firebase";
import * as moment from "moment";

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
          categories: ["Daily", "Weekly", "Monthly", "Total"]
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

  componentWillMount() {
    this.getFarmerStats();
    this.getAdvanceStats();
  }

  getFarmerStats() {
    const query = firebase
      .database()
      .ref("farmers")
      .orderByKey();

    query.on("value", snapshot => {
      let todayFarmerCounter = 0;
      let weekFarmerCounter = 0;
      let monthFarmerCounter = 0;
      var cummulativeFarmerCounter = 0;

      snapshot.forEach(childSnapshot => {
        // Get values for day, month and cummulative

        const created = childSnapshot.child("created").val();
        const isToday = moment(created, "DD/MM/YYYY").isSame(Date.now(), "day");
        const isWeek = moment(created, "DD/MM/YYYY").isSame(Date.now(), "week");
        const isMonth = moment(created, "DD/MM/YYYY").isSame(
          Date.now(),
          "month"
        );

        isToday
          ? (todayFarmerCounter = todayFarmerCounter + 1)
          : (todayFarmerCounter = todayFarmerCounter + 0);

        isWeek
          ? (weekFarmerCounter = weekFarmerCounter + 1)
          : (weekFarmerCounter = weekFarmerCounter + 0);

        isMonth
          ? (monthFarmerCounter = monthFarmerCounter + 1)
          : (monthFarmerCounter = monthFarmerCounter + 0);

        // Cummulative counter
        created
          ? (cummulativeFarmerCounter = cummulativeFarmerCounter + 1)
          : (cummulativeFarmerCounter = cummulativeFarmerCounter + 0);
      });

      this.setState({
        chartOptions: {
          series: [
            {
              type: "column",
              name: "Farmers",
              data: [
                todayFarmerCounter,
                weekFarmerCounter,
                monthFarmerCounter,
                cummulativeFarmerCounter
              ]
            },
            {
              type: "column",
              name: "Advances",
              data: [2, 3, 5, 6]
            },
            {
              type: "column",
              name: "Procurements",
              data: [4, 3, 3, 9]
            },
            {
              type: "spline",
              name: "Average Advances",
              data: [3, 2.67, 3, 6.33],
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
    });
  }

  getAdvanceStats() {
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();

    query.on("value", snapshot => {
      let todayCounter = 0;
      let weekCounter = 0;
      let monthCounter = 0;
      let cummulativeCounter = 0;

      snapshot.forEach(childSnapshot => {
        // Get values for day, month and cummulative

        childSnapshot.forEach(grandChildSnapshot => {
          const created = grandChildSnapshot.child("created").val();
          const isToday = moment(created, "DD/MM/YYYY").isSame(
            Date.now(),
            "day"
          );
          const isWeek = moment(created, "DD/MM/YYYY").isSame(
            Date.now(),
            "week"
          );
          const isMonth = moment(created, "DD/MM/YYYY").isSame(
            Date.now(),
            "month"
          );

          isToday
            ? (todayCounter =
                todayCounter +
                parseInt(grandChildSnapshot.child("advanceAmount").val()))
            : (todayCounter = todayCounter + 0);

          isWeek
            ? (weekCounter =
                weekCounter +
                parseInt(grandChildSnapshot.child("advanceAmount").val()))
            : (weekCounter = weekCounter + 0);

          isMonth
            ? (monthCounter =
                monthCounter +
                parseInt(grandChildSnapshot.child("advanceAmount").val()))
            : (monthCounter = monthCounter + 0);

          // Cummulative counter
          cummulativeCounter =
            (cummulativeCounter +
              parseInt(grandChildSnapshot.child("advanceAmount").val())) |
            parseInt(grandChildSnapshot.child("commodityValue").val());
        });

        this.setState({
          chartOptions: {
            series: [
              {
                type: "column",
                name: "Farmers",
                data: []
              },
              {
                type: "column",
                name: "Advances",
                data: [
                  todayCounter,
                  weekCounter,
                  monthCounter,
                  cummulativeCounter
                ]
              },
              {
                type: "column",
                name: "Procurements",
                data: [4, 3, 3, 9]
              },
              {
                type: "spline",
                name: "Average Advances",
                data: [3, 2.67, 3, 6.33],
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
      });
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
