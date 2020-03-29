import React, { Component } from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import HighchartsReact from "highcharts-react-official";

import firebase from "../common/firebase";

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

class AdvancesByMode extends Component {
  constructor() {
    super();
    this.state = {
      chartOptions: {
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: "Advances by Mode"
        },
        subtitle: {
          text: "Commodity count"
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: "Advance Mode Count",
            data: [
              ["Seeds", 0],
              ["Fertilizers", 0],
              ["Chemicals", 0],
              ["Polythene", 0],
              ["Money", 0]
            ]
          }
        ]
      }
    };
  }

  componentDidMount() {
    // Get value of advances provided
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();
    query.on("value", snapshot => {
      let seedlingCounter = 0;
      let fertilizerCounter = 0;
      let chemicalCounter = 0;
      let polytheneCounter = 0;
      let moneyCounter = 0;

      snapshot.forEach(childSnapshot => {
        // Get values
        childSnapshot.forEach(grandChildSnapshot => {
          const isSeedling =
            grandChildSnapshot.child("commodityAdvanced").val() === "Seedlings";

          const isFertilizer =
            grandChildSnapshot.child("commodityAdvanced").val() ===
            "Fertilizer";

          const isChemicals =
            grandChildSnapshot.child("commodityAdvanced").val() === "Chemicals";

          const isPolythene =
            grandChildSnapshot.child("commodityAdvanced").val() ===
            "Polythene tubes";

          const isMoney =
            grandChildSnapshot.child("commodityAdvanced").val() === "";

          if (isSeedling) {
            seedlingCounter += 1;
          } else if (isFertilizer) {
            fertilizerCounter += 1;
          } else if (isChemicals) {
            chemicalCounter += 1;
          } else if (isPolythene) {
            polytheneCounter += 1;
          } else if (isMoney) {
            moneyCounter += 1;
          }
        });
      });
      this.setState({
        chartOptions: {
          series: [
            {
              data: [
                moneyCounter,
                seedlingCounter,
                fertilizerCounter,
                chemicalCounter,
                polytheneCounter
              ]
            }
          ]
        }
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

AdvancesByMode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvancesByMode);
