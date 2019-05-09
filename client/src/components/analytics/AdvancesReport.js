import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";
import * as moment from "moment";

const styles = theme => ({
  bigAvatar: {
    width: 100,
    height: 100
  }
});

class AdvancesReport extends React.Component {
  constructor() {
    super();
    this.state = {
      advancesToday: 0,
      weeklyAdvance: 0,
      cummulative: 0
    };
  }

  componentDidMount() {
    // Get value of procurement provided
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();
    query.on("value", snapshot => {
      let todayCounter = 0;
      let weekCounter = 0;
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

          console.log(isToday);

          //console.log(moment(created, "DD/MM/YYYY").fromNow());

          // Cummulative counter
          cummulativeCounter =
            cummulativeCounter +
            parseInt(grandChildSnapshot.child("advanceAmount").val());
        });
      });
      this.setState({
        advancesToday: todayCounter,
        weeklyAdvance: weekCounter,
        cummulative: cummulativeCounter
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.card}>
            <CardContent align="center">
              <Typography variant="headline" align="center" color="Primary">
                Advances Report
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/procurement.png"
                className={classes.bigAvatar}
              />
              <br />
              <br />
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Today
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    {this.state.advancesToday}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Week
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    {this.state.weeklyAdvance}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Cummulative
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    {this.state.cummulative}
                  </Typography>
                </Grid>
              </Grid>
              <br />
            </CardContent>
          </Card>
          <br />

          <br />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AdvancesReport);
