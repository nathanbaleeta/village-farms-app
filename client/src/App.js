import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Navigation from "./components/Navigation/Navigation";
import firebase from "./components/common/firebase";


const styles = theme => ({
  root: {
    zoom: "80%"
  }
});


class App extends Component {
  state = {
    authenticated: false
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticated => {
      authenticated
        ? this.setState(() => ({
            authenticated: true
          }))
        : this.setState(() => ({
            authenticated: false
          }));
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
      <div className={classes.root}>
          <Navigation authenticated={this.state.authenticated} />
      </div>
      </Fragment>
      );
  }
}

export default withStyles(styles)(App);
