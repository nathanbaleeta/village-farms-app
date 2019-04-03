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

class AdvancesSummary extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.card}>
            <CardContent align="center">
              <Typography variant="headline" align="center" color="Primary">
                Advances Summary
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/advances.png"
                className={classes.bigAvatar}
              />
              <br />
              <br />
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Received
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    342
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Mode
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    342
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Value
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="Primary"
                  >
                    213
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

export default withStyles(styles)(AdvancesSummary);
