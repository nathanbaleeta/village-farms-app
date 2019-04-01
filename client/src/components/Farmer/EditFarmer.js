import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({});

class EditFarmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Typography component="h1" variant="h4" align="center">
            Edit Farmer
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="firstname"
                name="firstname"
                value={this.state.firstname}
                onChange={this.onChange}
                label="Firstname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="lastname"
                name="lastname"
                value={this.state.lastname}
                onChange={this.onChange}
                label="Lastname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="title"
                name="title"
                value={this.state.title}
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
                value={this.state.sex}
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
                value={this.state.maritalStatus}
                onChange={this.onChange}
                label="Marital Status"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="phone"
                name="phone"
                value={this.state.phone}
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
                value={this.state.mmRegistered}
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
                value={this.state.district}
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
                value={this.state.traditionalAuthority}
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
                value={this.state.village}
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
                Update Farmer
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(EditFarmer);
