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

class FarmersByDistrict extends Component {
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
          text: "Farmer's registered by District"
        },
        subtitle: {
          text: "District statistics"
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: "District count",
            data: [
              ["Chitipa", 0],
              ["Mzimba", 0],
              ["Nkhatabay", 0],
              ["Ntchisi", 0],
              ["Rumphi", 0]
            ]
          }
        ]
      }
    };
  }
  componentDidMount() {
    // Get per district count
    const query = firebase
      .database()
      .ref("farmers")
      .orderByKey();
    query.on("value", snapshot => {
      let chitipaCounter = 0;
      let mzimbaCounter = 0;
      let nkhatabayCounter = 0;
      let ntchisiCounter = 0;
      let rumphiCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Verify belongs to specified district before before incrementing using counter
        const isChitipa = childSnapshot.child("district").val() === "Chitipa";

        const isMzimba = childSnapshot.child("district").val() === "Mzimba";

        const isNkhatabay =
          childSnapshot.child("district").val() === "Nkhatabay";

        const isNtchisi = childSnapshot.child("district").val() === "Nkhatabay";

        const isRumphi = childSnapshot.child("district").val() === "Rumphi";

        if (isChitipa) {
          chitipaCounter += 1;
        } else if (isMzimba) {
          mzimbaCounter += 1;
        } else if (isNkhatabay) {
          nkhatabayCounter += 1;
        } else if (isNtchisi) {
          ntchisiCounter += 1;
        } else if (isRumphi) {
          rumphiCounter += 1;
        }
      });
      this.setState({
        chartOptions: {
          series: [
            {
              data: [
                chitipaCounter,
                mzimbaCounter,
                nkhatabayCounter,
                ntchisiCounter,
                rumphiCounter
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

FarmersByDistrict.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FarmersByDistrict);
