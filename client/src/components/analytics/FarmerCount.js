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

class FarmerCount extends Component {
  constructor() {
    super();
    this.state = {
      numOfFarmers: 0
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
                Farmers
              </Typography>
              <Typography
                variant="h3"
                align="center"
                color="default"
                gutterBottom
                style={{ fontWeight: "normal" }}
              >
                {this.state.numOfFarmers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FarmerCount);
