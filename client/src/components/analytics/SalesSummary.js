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

class FarmHistoryStatus extends Component {
  constructor() {
    super();
    this.state = {
      numOfSales: 0,
      totalPrice: 0
    };
  }

  componentDidMount() {
    // Get sales count
    const salesRef = firebase.database().ref("sales");
    salesRef.on("value", snapshot => {
      const salesCount = snapshot.numChildren();
      this.setState({
        numOfSales: salesCount
      });
    });

    // Get total price count
    const query = firebase
      .database()
      .ref("sales")
      .orderByKey();
    query.on("value", snapshot => {
      let totalPriceCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Total Price counter; convert string to int
        totalPriceCounter =
          totalPriceCounter + parseInt(childSnapshot.child("totalPrice").val());
      });
      this.setState({
        totalPrice: totalPriceCounter
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
                  Sales Summary
                </Typography>
                <br />
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/sales-icon.jpg"
                  className={classes.bigAvatar}
                />
                <br />

                <br />
                <Grid container spacing={24}>
                  <Grid item xs={6} sm={6}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Sales
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      color="Primary"
                      gutterBottom
                    >
                      {this.state.numOfSales}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Total Price
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      color="Primary"
                      gutterBottom
                    >
                      {this.state.totalPrice}
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

export default withStyles(styles)(FarmHistoryStatus);
