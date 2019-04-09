import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import LineChart from "../components/analytics/LineChart";
import PieChart from "../components/analytics/PieChart";
import BarChart from "../components/analytics/BarChart";
import RegistrationSummary from "../components/analytics/RegistrationSummary";
import FarmHistoryStatus from "../components/analytics/FarmHistoryStatus";
import AdvancesSummary from "../components/analytics/AdvancesSummary";
import ProcurementSummary from "../components/analytics/ProcurementSummary";

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
        <br />
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <RegistrationSummary />
          </Grid>
          <Grid item xs={3}>
            <FarmHistoryStatus />
          </Grid>
          {/*<Grid item xs={3}>
            <AdvancesSummary />
          </Grid>
          <Grid item xs={3}>
            <ProcurementSummary />
          </Grid>
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
          </Grid> */}
        </Grid>
        <br />

        <br />
      </div>
    );
  }
}

Visualization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Visualization);
