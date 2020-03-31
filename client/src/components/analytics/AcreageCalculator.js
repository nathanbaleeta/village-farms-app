import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import LandscapeIcon from "@material-ui/icons/Landscape";

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

    const { acreage } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <div
              style={{
                padding: "20px",
                background: "orange",
                color: "white"
              }}
            >
              <Grid container spacing={1}>
                <Grid item lg={8} sm={6} xs={8}>
                  <Typography
                    variant="subtitle2"
                    color="default"
                    gutterBottom
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    ACREAGE
                  </Typography>
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    {acreage}
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xs={4}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    align="right"
                    style={{ fontSize: "62px" }}
                  >
                    <LandscapeIcon
                      color="inherit"
                      fontSize="inherit"
                      style={{ color: "black" }}
                    />
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

export default withStyles(styles)(AcreageCalculator);
