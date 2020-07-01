import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { Switch, Route } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

import firebase from "../../common/firebase";

const styles = (theme) => ({
  districtList: {
    width: "100%",
    backgroundColor: "white",
    color: "white",
    overflow: "auto",
  },

  link: {
    textDecoration: "none",
  },

  // Overiding CSS with classnames for ListItemText Implementation
  primary: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "10px",
  },
  secondary: {
    fontSize: "18px",
    color: "black",
  },
});

class MarketSettings extends Component {
  state = {
    visible: false,
    districts: [],
  };

  componentWillMount() {
    const districtsRef = firebase.database().ref("settings").child("districts");

    districtsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          district: items[item].district,
          created: items[item].created,
        });
      }

      //console.log(newState);
      this.setState({
        districts: newState,
      });
      console.log(this.state.districts);
    });
  }

  render() {
    const { classes } = this.props;
    const { districts } = this.state;

    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={3}
            style={{
              marginLeft: "-1%",
              marginTop: "-4%",

              borderRight: "1px solid #d4d4d4",
              //borderRight: "1px solid #d4d4d4",
              //backgroundColor: "white"
            }}
          >
            {/* District List */}

            <Divider />
            <List className={classes.districtList}>
              {districts.map((row) => (
                <Link to={"/settings"} className={classes.link}>
                  <ListItem button className={classes.message}>
                    <ListItemText
                      classes={{
                        primary: classes.primary,
                      }}
                      primary={row.district}
                    />
                  </ListItem>
                  <Divider />
                </Link>
              ))}
            </List>

            {/* District List */}
          </Grid>
          <Grid item xs={8} sm={8}>
            <Switch>
              <Route
                path="/settings"
                render={(props) => (
                  <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    color="primary"
                  ></Typography>
                )}
              />
              />
            </Switch>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

MarketSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MarketSettings);
