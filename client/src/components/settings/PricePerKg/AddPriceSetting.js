import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Fab from "@material-ui/core/Fab";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import NumberFormat from "react-number-format";

import firebase from "../../common/firebase";

const styles = theme => ({});

class AddPriceSetting extends Component {
  constructor() {
    super();
    this.state = {
      pricePerKg: "",
      district: "",
      districts: []
    };
  }

  componentDidMount() {
    this.populateDistricts();
  }

  populateDistricts = () => {
    const districtsRef = firebase
      .database()
      .ref("settings")
      .child("districts");

    districtsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          district: items[item].district
        });
      }

      //console.log(newState);
      this.setState({
        districts: newState
      });
      //console.log(this.state.districts);
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Boolean function for checking whether district exists already
  hasDuplicates = district => {
    let value = false;
    firebase
      .database()
      .ref()
      .child("settings")
      .child("prices")
      .orderByChild("district")
      .equalTo(district)
      .once("value", snapshot => {
        snapshot.exists() ? (value = true) : (value = false);
      });
    return value;
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const priceConfig = {
      pricePerKg: parseInt(this.state.pricePerKg),
      district: this.state.district,
      dateConfigured: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    //Form validation for adding price setting
    if (this.state.pricePerKg === "" || this.state.district === "") {
      return;
    }
    // Prevent duplicate districts by checking if it exists before saving
    else if (this.hasDuplicates(this.state.district)) {
      event.preventDefault();
      return;
    } else {
      //Save price settings
      const settingsRef = firebase.database().ref("settings/prices");
      settingsRef.push(priceConfig);
      this.setState({
        pricePerKg: "",
        district: ""
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { pricePerKg, districts } = this.state;

    return (
      <Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Fab
              color="primary"
              variant="extended"
              aria-label="Delete"
              onClick={this.handleOpen}
              className={classes.fab}
              style={{
                backgroundColor: "#FFBF00",
                color: "black"
              }}
            >
              <TrendingUpIcon className={classes.extendedIcon} />
              Set Price per kg
            </Fab>

            <Dialog
              id="myDialog"
              maxWidth="sm"
              open={this.state.open}
              aria-labelledby="form-dialog-title"
              onClose={this.handleClose}
              style={{
                zoom: "80%"
              }}
            >
              <DialogTitle
                maxWidth="sm"
                id="simple-dialog-title"
                color="default"
                style={{
                  backgroundColor: "white"
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  style={{ color: "black" }}
                >
                  Set Price per kg setting
                </Typography>
              </DialogTitle>
              <DialogContent style={{ overflow: "hidden" }}>
                <form onSubmit={this.handlePriceSetting}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h6" align="left" color="primary">
                        [Used in Procurement/ Advance modules]
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="district"
                        select
                        name="district"
                        value={this.state.district}
                        onChange={this.onChange}
                        label="District"
                        fullWidth
                        helperText="Please select district"
                        InputLabelProps={{
                          shrink: true
                        }}
                      >
                        {districts.map(option => (
                          <MenuItem key={option.id} value={option.district}>
                            {option.district}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <NumberFormat
                        value={pricePerKg}
                        thousandSeparator={true}
                        allowNegative={false}
                        decimalScale={2}
                        onValueChange={values => {
                          const { floatValue } = values;
                          this.setState({
                            pricePerKg: floatValue
                          });
                        }}
                        customInput={TextField}
                        label="Price per kg"
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        style={{
                          backgroundColor: "midnightblue",
                          color: "white"
                        }}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AddPriceSetting);
