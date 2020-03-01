import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import GroupIcon from "@material-ui/icons/Group";

import Typography from "@material-ui/core/Typography";

import PriceSettings from "../settings/PriceSettings";

import DistrictSettings from "./District/DistrictSettings";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: "100%"
  }
};

class GeneralSettings extends React.Component {
  state = {
    value: 0
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
        <Paper square className={classes.root} elevation="1">
          <br />
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab icon={<AttachMoneyIcon />} label="PRICE PER KG" />
            <Tab icon={<AddLocationIcon />} label="LOCATIONS" />
            <Tab icon={<GroupIcon />} label="USERS" />
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
          {value === 2 && <TabContainer />}
        </Paper>
      </div>
    );
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GeneralSettings);
