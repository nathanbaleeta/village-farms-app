import React from "react";
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

import { districts } from "../common/districtList";
import firebase from "../common/firebase";

const styles = theme => ({});

class CreateFarmer extends React.Component {
  constructor() {
    super();
    this.state = {
      pricePerKg: "",
      district: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const priceConfig = {
      pricePerKg: this.state.pricePerKg,
      district: this.state.district,
      dateConfigured: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    console.log(priceConfig);

    //Save price settings
    const settingsRef = firebase.database().ref("settings");
    settingsRef.push(priceConfig);
    this.setState({
      pricePerKg: "",
      district: ""
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Fab
            color="primary"
            variant="extended"
            aria-label="Delete"
            onClick={this.handleOpen}
            className={classes.fab}
            style={{
              backgroundColor: "mediumblue",
              color: "white"
            }}
          >
            <TrendingUpIcon className={classes.extendedIcon} />
            Set Price per kg
          </Fab>

          <Dialog
            id="myDialog"
            open={this.state.open}
            aria-labelledby="form-dialog-title"
            onClose={this.handleClose}
          >
            <DialogTitle
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
                Add Price setting
              </Typography>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={this.handlePriceSetting}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" align="left" color="primary">
                      Procurement prices
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      id="pricePerKg"
                      name="pricePerKg"
                      label="Price per kg"
                      type="number"
                      required
                      fullWidth
                      className={classes.textField}
                      value={this.state.pricePerKg}
                      onChange={this.onChange}
                      margin="normal"
                    />
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
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      style={{
                        backgroundColor: "mediumblue",
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
    );
  }
}

export default withStyles(styles)(CreateFarmer);
