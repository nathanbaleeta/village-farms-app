import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//import firebase from "../common/firebase";

const styles = theme => ({});

const expenses = [
  {
    value: "Electricity",
    label: "Electricity"
  },
  {
    value: "Internet",
    label: "Internet"
  },
  {
    value: "Mobile",
    label: "Mobile"
  },
  {
    value: "Travelling",
    label: "Travelling"
  },
  {
    value: "Uncategorized",
    label: "Uncategorized"
  }
];

class CreateFarmer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      title: "",
      sex: "",
      maritalStatus: "",
      mobile: "",
      mmRegistered: "",
      district: "",
      traditionalAuthority: "",
      village: ""
    };
  }

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
    const farmer = {
      name: this.state.name,
      title: this.state.title,
      sex: this.state.sex,
      maritalStatus: this.state.maritalStatus,
      mobile: this.state.mobile,
      mmRegistered: this.state.mmRegistered,
      district: this.state.district,
      traditionalAuthority: this.state.traditionalAuthority,
      village: this.state.village
    };

    //Save farmer module

    this.setState({
      name: "",
      title: "",
      sex: "",
      maritalStatus: "",
      mobile: "",
      mmRegistered: "",
      district: "",
      traditionalAuthority: "",
      village: ""
    });
  };

  render() {
    const {
      name,
      title,
      sex,
      maritalStatus,
      mobile,
      mmRegistered,
      district,
      traditionalAuthority,
      village
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Typography component="h1" variant="h4" align="center">
            Register Farmer
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="name"
                name="name"
                value={name}
                onChange={this.onChange}
                label="Fullname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="title"
                name="title"
                value={title}
                onChange={this.onChange}
                label="Title"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="sex"
                name="sex"
                value={sex}
                onChange={this.onChange}
                label="Sex"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="maritalStatus"
                name="maritalStatus"
                value={maritalStatus}
                onChange={this.onChange}
                label="Marital Status"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={this.onChange}
                label="Mobile phone"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="mmRegistered"
                name="mmRegistered"
                value={mmRegistered}
                onChange={this.onChange}
                label="Mobile Money Registered"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="district"
                name="district"
                value={district}
                onChange={this.onChange}
                label="District"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="traditionalAuthority"
                name="traditionalAuthority"
                value={traditionalAuthority}
                onChange={this.onChange}
                label="Traditional Authority"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="village"
                name="village"
                value={village}
                onChange={this.onChange}
                label="Village"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >
                Save User
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateFarmer);
