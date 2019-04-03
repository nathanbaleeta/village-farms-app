import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import Fab from "@material-ui/core/Fab";

import firebase from "../common/firebase";

const styles = theme => ({
  bigAvatar: {
    width: 100,
    height: 100
  }
});

class RegistrationSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      numOfFarmers: "",
      males: 0,
      females: 0
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
        males: maleCounter,
        females: femaleCounter
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
                Registered Farmers
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/farmers.jpeg"
                className={classes.bigAvatar}
              />
              <br />
              <br />
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Farmers
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    {this.state.numOfFarmers}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Male
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    {this.state.males}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Female
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    {this.state.females}
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

export default withStyles(styles)(RegistrationSummary);
