import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../../common/firebase";

import AddDistrict from "./AddDistrict";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

class PriceSettings extends React.Component {
  state = {
    pricePerKg: "",
    district: ""
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    // procurement price setting.
    const priceRef = firebase
      .database()
      .ref("settings")
      .orderByKey();
    priceRef.on("value", snapshot => {
      let priceConfig = "";
      snapshot.forEach(function(childSnapshot) {
        priceConfig = childSnapshot.child("pricePerKg").val();
      });
      this.setState({
        pricePerKg: priceConfig
      });
      console.log(this.state.pricePerKg);
    });
  }
  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePriceSetting = event => {
    event.preventDefault();

    // get our form data out of state
    //const date = Date.now();
    console.log(Date(Date.now()));
    const priceConfig = {
      pricePerKg: this.state.pricePerKg,
      district: this.state.district,
      dateConfigured: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    const settingsRef = firebase.database().ref("settings");

    settingsRef.push(priceConfig);
  };

  render() {
    //const { classes } = this.props;

    return (
      <React.Fragment>
        <AddDistrict />
      </React.Fragment>
    );
  }
}

PriceSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PriceSettings);
