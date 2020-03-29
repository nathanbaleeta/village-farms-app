import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Typography } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({});

class AdvancesCount extends Component {
  constructor() {
    super();
    this.state = {
      received: 0
    };
  }

  componentDidMount() {
    // Get count of farmers who have received advances
    const farmersRef = firebase.database().ref("advances");
    farmersRef.on("value", snapshot => {
      const farmerCount = snapshot.numChildren();
      this.setState({
        received: farmerCount
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
            elevation={1}
            style={{ borderLeft: "4px solid orange" }}
          >
            <CardContent align="center">
              <Typography variant="h5" align="center" gutterBottom>
                Advances
              </Typography>
              <Typography
                variant="h3"
                align="center"
                color="default"
                gutterBottom
                style={{ fontWeight: "normal" }}
              >
                {this.state.received}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AdvancesCount);
