import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({
  bigAvatar: {
    width: 170,
    height: 170
  }
});

class FarmHistoryStatus extends React.Component {
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
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.card}>
            <CardContent align="center">
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                style={{
                  color: "#0000CD"
                }}
              >
                Farm History & Status
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/acreage.png"
                className={classes.bigAvatar}
              />
              <br />

              <br />
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Acreage
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    color="Primary"
                    gutterBottom
                  >
                    {this.state.acreage}
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

export default withStyles(styles)(FarmHistoryStatus);
