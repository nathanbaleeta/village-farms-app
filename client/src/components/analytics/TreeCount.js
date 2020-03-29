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

class TreeCount extends Component {
  constructor() {
    super();
    this.state = {
      year1: 0,
      year2: 0,
      year3: 0
    };
  }

  componentDidMount() {
    const query = firebase
      .database()
      .ref("farmers")
      .orderByKey();
    query.on("value", snapshot => {
      let year1Counter = 0;
      let year2Counter = 0;
      let year3Counter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Year 1 trees counter; convert string to int
        year1Counter =
          year1Counter + parseInt(childSnapshot.child("year1").val());

        // Year 2 trees counter; convert string to int
        year2Counter =
          year2Counter + parseInt(childSnapshot.child("year2").val());

        // Year 3 trees counter; convert string to int
        year3Counter =
          year3Counter + parseInt(childSnapshot.child("year3").val());
      });
      this.setState({
        year1: year1Counter,
        year2: year2Counter,
        year3: year3Counter
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

    const { year1, year2, year3 } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card
            className={classes.card}
            elevation={1}
            style={{ borderLeft: "4px solid indigo" }}
          >
            <CardContent align="center">
              <Typography variant="h5" align="center" gutterBottom>
                Trees
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography
                    variant="h3"
                    align="center"
                    color="default"
                    gutterBottom
                  >
                    {this.nFormatter(year1)}
                  </Typography>
                  <Typography variant="h5" align="center" gutterBottom>
                    Y1
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography
                    variant="h2"
                    align="center"
                    color="default"
                    gutterBottom
                  >
                    {this.nFormatter(year2)}
                  </Typography>
                  <Typography variant="h4" align="center" gutterBottom>
                    Y2
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography
                    variant="h3"
                    align="center"
                    color="default"
                    gutterBottom
                  >
                    {this.nFormatter(year3)}
                  </Typography>
                  <Typography variant="h5" align="center" gutterBottom>
                    Y3
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TreeCount);
