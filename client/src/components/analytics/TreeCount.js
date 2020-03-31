import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Typography } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import NatureIcon from "@material-ui/icons/Nature";
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
      <Fragment>
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardActionArea>
              <div
                style={{
                  padding: "20px",
                  background: "#00CED1",
                  color: "white"
                }}
              >
                <Grid container spacing={1}>
                  <Grid item lg={8} sm={12} xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="default"
                      gutterBottom
                      style={{ fontWeight: "bold", color: "black" }}
                    >
                      TREE COUNT
                    </Typography>

                    <Grid container spacing={24}>
                      <Grid item xs={4} sm={4}>
                        <Typography
                          variant="h4"
                          align="left"
                          color="default"
                          gutterBottom
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          {this.nFormatter(year1)}
                        </Typography>
                        <Typography
                          variant="h5"
                          align="left"
                          color="inherit"
                          gutterBottom
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Y1
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={4}>
                        <Typography
                          variant="h4"
                          align="left"
                          color="default"
                          gutterBottom
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          {this.nFormatter(year2)}
                        </Typography>
                        <Typography
                          variant="h5"
                          align="left"
                          gutterBottom
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Y2
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={4}>
                        <Typography
                          variant="h4"
                          align="left"
                          color="default"
                          gutterBottom
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          {this.nFormatter(year3)}
                        </Typography>
                        <Typography
                          variant="h5"
                          align="left"
                          gutterBottom
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Y3
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={4} sm={6} xs={12}>
                    <Typography
                      variant="subtitle2"
                      align="right"
                      gutterBottom
                      style={{ fontSize: "62px" }}
                    >
                      <NatureIcon
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
      </Fragment>
    );
  }
}

export default withStyles(styles)(TreeCount);
