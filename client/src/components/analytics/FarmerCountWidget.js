import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import GroupIcon from "@material-ui/icons/Group";

import HighchartsReact from "highcharts-react-official";

import firebase from "../common/firebase";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class FarmerCountWidget extends Component {
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
    const { numOfFarmers } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <div
              style={{
                padding: "20px",
                background: "mediumblue",
                color: "white"
              }}
            >
              <Grid container spacing={1}>
                <Grid item lg={8} sm={6} xs={12}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                  >
                    FARMERS
                  </Typography>
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                  >
                    {numOfFarmers}
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ fontSize: "62px" }}
                  >
                    <GroupIcon
                      color="default"
                      fontSize="inherit"
                      //style={{ color: "orange" }}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

FarmerCountWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FarmerCountWidget);
