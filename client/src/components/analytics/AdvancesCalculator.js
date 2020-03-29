import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({});

class AdvancesCalculator extends Component {
  constructor() {
    super();
    this.state = {
      advanceValue: 0
    };
  }

  componentDidMount() {
    // Get value of advances provided
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();
    query.on("value", snapshot => {
      let valueCounter = 0;

      snapshot.forEach(childSnapshot => {
        // Get values

        childSnapshot.forEach(grandChildSnapshot => {
          // Advance Value counter; convert string to int
          valueCounter =
            (valueCounter +
              parseInt(grandChildSnapshot.child("advanceAmount").val())) |
            parseInt(grandChildSnapshot.child("commodityValue").val());
        });
      });
      this.setState({
        advanceValue: valueCounter
      });
    });
  }

  // Number formatter for high values greater than a thousand
  nFormatter = num => {
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card
            className={classes.card}
            elevation={1}
            style={{ borderLeft: "4px solid #1E90FF" }}
          >
            <CardContent align="center">
              <Typography variant="h5" align="center" gutterBottom>
                Advance value
              </Typography>
              <Typography
                variant="h1"
                align="center"
                color="default"
                gutterBottom
                style={{ fontWeight: "normal" }}
              >
                {this.nFormatter(advanceValue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AdvancesCalculator);
