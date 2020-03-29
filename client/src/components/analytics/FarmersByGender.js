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

class FarmersByGender extends Component {
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
          text: "Farmer's registered by Gender"
        },
        subtitle: {
          text: "Male vs Female Farmers'"
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: "Farmer count",
            data: [
              ["Male", 0],
              ["Female", 0]
            ]
          }
        ]
      }
    };
  }
  componentDidMount() {
    // Get Farmer count
    const farmersRef = firebase.database().ref("farmers");
    farmersRef.on("value", snapshot => {
      const farmerCount = snapshot.numChildren();
      this.setState({
        numOfFarmers: farmerCount
      });
    });

    // Get gender count
    const query = firebase
      .database()
      .ref("farmers")
      .orderByKey();
    query.on("value", snapshot => {
      let maleCounter = 0;
      let femaleCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Verify gender before incrementing by sex
        const isMale = childSnapshot.child("sex").val() === "Male";

        if (isMale) {
          maleCounter += 1;
        } else {
          femaleCounter += 1;
        }
      });
      this.setState({
        chartOptions: {
          series: [
            {
              data: [maleCounter, femaleCounter]
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

FarmersByGender.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FarmersByGender);
