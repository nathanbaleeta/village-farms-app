import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Fab from "@material-ui/core/Fab";
//import AddIcon from "@material-ui/icons/Add";
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
    const district = {
      district: this.state.district,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    console.log(district);

    //Save price settings
    const settingsRef = firebase.database().ref("settings/districts");
    settingsRef.push(district);
    this.setState({
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
          >
            <AddLocationIcon className={classes.extendedIcon} />
            Add district
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
                backgroundColor: "indigo"
              }}
            >
              <Typography
                component="h1"
                variant="display1"
                align="center"
                style={{ color: "white" }}
              >
                Add District
              </Typography>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={this.handleDistrictSetting}>
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="headline" align="left" color="inherit">
                      District settings
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item xs={12} sm={12}>
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
                  <br />
                  <Grid item xs={12} sm={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      color="primary"
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
