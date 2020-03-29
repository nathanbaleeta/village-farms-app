import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Typography } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({});

class AcreageCalculator extends Component {
  constructor() {
    super();
    this.state = {
      acreage: 0
    };
  }

  componentDidMount() {
    // Get mature & immature trees count
    const query = firebase
      .database()
      .ref("farmers")
      .orderByKey();
    query.on("value", snapshot => {
      let acreageCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Hectarage counter; convert string to int
        acreageCounter =
          acreageCounter + parseFloat(childSnapshot.child("acreage").val());
      });
      this.setState({
        acreage: acreageCounter.toFixed(2) // Round off to 2 decimal places
      });
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card
            className={classes.card}
            elevation={0}
            style={{ border: "1px solid #d4d4d4" }}
          >
            <CardContent align="center">
              <Typography variant="h5" align="center" gutterBottom>
                Acreage
              </Typography>
              <Typography
                variant="h3"
                align="center"
                color="default"
                gutterBottom
                style={{ fontWeight: "normal" }}
              >
                {this.state.acreage}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AcreageCalculator);
