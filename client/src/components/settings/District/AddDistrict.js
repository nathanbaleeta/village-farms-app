import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Fab from "@material-ui/core/Fab";
import AddLocationIcon from "@material-ui/icons/AddLocation";

import Grid from "@material-ui/core/Grid";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import firebase from "../../common/firebase";

const styles = theme => ({});

class AddDistrict extends React.Component {
  constructor() {
    super();
    this.state = {
      district: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
      .child("districts")
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
    const district = {
      district: this.toTitleCase(this.state.district),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    //Form validation for adding price setting
    if (this.state.district === "") {
      return;
    }
    // Prevent duplicate districts by checking if it exists before saving
    else if (this.hasDuplicates(this.state.district)) {
      return;
    } else {
      //Save price settings
      const settingsRef = firebase.database().ref("settings/districts");
      settingsRef.push(district);
      this.setState({
        district: ""
      });
    }
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
              backgroundColor: "#FFBF00",
              color: "black"
            }}
          >
            <AddLocationIcon className={classes.extendedIcon} />
            Add district
          </Fab>

          <Dialog
            id="myDialog"
            maxWidth="xs"
            open={this.state.open}
            aria-labelledby="form-dialog-title"
            onClose={this.handleClose}
            style={{
              zoom: "80%"
            }}
          >
            <DialogTitle
              id="simple-dialog-title"
              color="primary"
              style={{
                backgroundColor: "white",
                color: "black"
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                align="center"
                style={{ color: "midnightblue" }}
              >
                Add District
              </Typography>
            </DialogTitle>
            <DialogContent style={{ overflow: "hidden" }}>
              <form onSubmit={this.handleDistrictSetting}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" align="left" color="default">
                      [For addition of new districts]
                    </Typography>
                    <TextField
                      required
                      id="district"
                      name="district"
                      label="District"
                      fullWidth
                      className={classes.textField}
                      value={this.state.district}
                      onChange={this.onChange}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      color="primary"
                      style={{
                        backgroundColor: "midnightblue",
                        color: "white"
                      }}
                    >
                      Save District
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

export default withStyles(styles)(AddDistrict);
