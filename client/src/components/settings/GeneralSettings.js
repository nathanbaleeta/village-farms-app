import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import GroupIcon from "@material-ui/icons/Group";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import Typography from "@material-ui/core/Typography";

import PriceSettings from "../settings/PricePerKg/PriceSettings";

import DistrictSettings from "./District/DistrictSettings";
import MarketSettings from "./Market/MarketSettings";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: "100%",
  },
};

class GeneralSettings extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Typography variant="h4" align="center" color="inherit">
          General Settings
        </Typography>
        <br />
        <br />
        <Paper square className={classes.root} elevation="0">
          <br />
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="default"
          >
            <Tab
              icon={<TrendingUpIcon />}
              label="PRICE PER KG"
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            />
            <Tab
              icon={<AddLocationIcon />}
              label="LOCATIONS"
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            />
            <Tab
              icon={<GroupIcon />}
              label="MARKETS"
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            />
          </Tabs>
          {value === 0 && (
            <TabContainer>
              <br /> <br />
              <PriceSettings />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <br /> <br />
              <DistrictSettings />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <br /> <br />
              <MarketSettings />
            </TabContainer>
          )}
        </Paper>
      </div>
    );
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralSettings);
