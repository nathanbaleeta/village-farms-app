import React from "react";
import { withStyles } from "@material-ui/core/styles";

import firebase from "../common/firebase";

import { Link } from "react-router-dom";

const styles = {};

class FarmerDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {}

  render() {
    const { data } = this.state;
    const { classes } = this.props;

    return <React.Fragment />;
  }
}

export default withStyles(styles)(FarmerDetails);
