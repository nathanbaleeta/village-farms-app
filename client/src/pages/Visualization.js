import React from "react";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import LineChart from "../components/analytics/LineChart";
import PieChart from "../components/analytics/PieChart";
import BarChart from "../components/analytics/BarChart";
import GeoChart from "../components/analytics/GeoChart";
import LinearDeterminate from "../components/analytics/LinearDeterminate";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class Visualization extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <img src="group.png" alt="Kitten" height="45" width="45" />
              <Typography component="h2" variant="h6" gutterBottom>
                Total Number Registered
              </Typography>
              <Typography component="h2" variant="h4" gutterBottom>
                172
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <img src="trees.png" alt="Kitten" height="45" width="45" />
              <Typography component="h2" variant="h6" gutterBottom>
                Total Mature trees
              </Typography>
              <Typography component="h2" variant="h4" gutterBottom>
                1289
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <img src="tree.png" alt="Kitten" height="45" width="45" />
              <Typography component="h2" variant="h6" gutterBottom>
                Total Immature trees
              </Typography>
              <Typography component="h2" variant="h4" gutterBottom>
                122
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <img src="hills.png" alt="Kitten" height="45" width="45" />
              <Typography component="h2" variant="h6" gutterBottom>
                Total Hectarage
              </Typography>
              <Typography component="h2" variant="h4" gutterBottom>
                1232
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <br />
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <PieChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <BarChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <GeoChart />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <LinearDeterminate />
            </Paper>
          </Grid>
        </Grid>
        <br />

        <Typography component="h2" variant="h4" gutterBottom>
          Farmers' List
        </Typography>

        <br />
      </div>
    );
  }
}

Visualization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Visualization);
