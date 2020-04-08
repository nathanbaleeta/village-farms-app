import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import MoneyIcon from "@material-ui/icons/Money";

import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import firebase from "../common/firebase";

const styles = (theme) => ({});

class AdvancesCalculator extends Component {
  constructor() {
    super();
    this.state = {
      advanceValue: 0,
    };
  }

  componentDidMount() {
    // Get value of advances provided
    const query = firebase.database().ref("advances").orderByKey();
    query.on("value", (snapshot) => {
      let valueCounter = 0;

      snapshot.forEach((childSnapshot) => {
        // Get values

        childSnapshot.forEach((grandChildSnapshot) => {
          // Advance Value counter; convert string to int
          valueCounter =
            valueCounter +
            parseInt(grandChildSnapshot.child("advanceAmount").val()) +
            parseInt(grandChildSnapshot.child("commodityValue").val());
        });
      });
      this.setState({
        advanceValue: valueCounter,
      });
    });
  }

  // Number formatter for high values greater than a thousand
  nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  render() {
    const { classes } = this.props;
    const { advanceValue } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <div
              style={{
                padding: "20px",
                background: "Indigo",
                color: "white",
              }}
            >
              <Grid container spacing={1}>
                <Grid item lg={8} sm={6} xs={8}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                  >
                    DEBT
                  </Typography>
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                  >
                    {this.nFormatter(advanceValue)}
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xs={4}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    align="right"
                    style={{ fontSize: "62px" }}
                  >
                    <MoneyIcon color="default" fontSize="inherit" />
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AdvancesCalculator);
