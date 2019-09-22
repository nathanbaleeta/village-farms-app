import React, { Component, Fragment } from "react";
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

class TreeCountSummary extends Component {
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
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
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
                  Tree count status
                </Typography>
                <br />
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/coffee-tree-plant.png"
                  className={classes.bigAvatar}
                />
                <br />

                <br />
                <Grid container spacing={24}>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Y1
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      color="Primary"
                      gutterBottom
                    >
                      {this.state.year1}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Y2
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      color="Primary"
                      gutterBottom
                    >
                      {this.state.year2}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Y3
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      color="Primary"
                      gutterBottom
                    >
                      {this.state.year3}
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
      </Fragment>
    );
  }
}

export default withStyles(styles)(TreeCountSummary);
