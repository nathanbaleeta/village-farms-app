import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import NumberFormat from "react-number-format";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { districts } from "../common/districtList";
import { titles } from "../common/titleList";
import { genders } from "../common/genderList";
import { maritalStatuses } from "../common/maritalStatusList";
import { mmOptions } from "../common/mobileMoneyOptions";
import { mmPayments } from "../common/mobileMoneyPayments";
import { lookup } from "../common/traditionalAuthorityList";
import firebase from "../common/firebase";

const styles = theme => ({
  saveFarmerButton: {
    //background: "mediumblue"
    background: "orange"
  }
});

class CreateFarmer extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      district: "",
      traditionalAuthority: "",
      selectedDate: new Date(Date.now() - 7776000000),
      yearOpened: "",
      matureTrees: "",
      immatureTrees: "",
      hectarage: "",

      dataValue: "Chitipa"
    };
  }

  capitalize(str) {
    let lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  onChangeDistrict = e => {
    this.setState({
      dataValue: e.target.value,
      district: e.target.value,
      traditionalAuthority: ""
    });
    console.log(e.target.value);
  };

  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
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
    const farmer = {
      firstname: this.capitalize(this.state.firstname),
      lastname: this.capitalize(this.state.lastname),
      title: this.state.title,
      sex: this.state.sex,
      maritalStatus: this.state.maritalStatus,
      phone: this.state.phone,
      mmRegistered: this.state.mmRegistered,
      mmPayment: this.state.mmPayment,
      district: this.state.district,
      traditionalAuthority: this.state.traditionalAuthority,
      yearOpened: this.state.yearOpened,
      matureTrees: parseInt(this.state.matureTrees),
      immatureTrees: parseInt(this.state.immatureTrees),
      hectarage: parseInt(this.state.hectarage),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    console.log(farmer);

    //Save farmer module
    const farmersRef = firebase.database().ref("farmers");

    farmersRef.push(farmer);
    this.setState({
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      district: "",
      traditionalAuthority: "",

      yearOpened: "",
      matureTrees: "",
      immatureTrees: "",
      hectarage: ""
    });
  };

  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      title,
      //sex,
      //maritalStatus,
      phone,
      //mmRegistered,
      //district,
      //traditionalAuthority,
      yearOpened,
      selectedDate,
      matureTrees,
      immatureTrees,
      hectarage
    } = this.state;

    const { dataValue } = this.state;
    const options = lookup[dataValue];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />
          <Typography variant="h5" gutterBottom>
            Autobiography
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="firstname"
                name="firstname"
                value={firstname}
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
                value={lastname}
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
                select
                name="title"
                value={title}
                onChange={this.onChange}
                label="Title*"
                fullWidth
                helperText="Please select title"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {titles.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="sex"
                select
                name="sex"
                value={this.state.sex}
                onChange={this.onChange}
                label="Sex*"
                fullWidth
                helperText="Please select gender"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {genders.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="maritalStatus"
                select
                name="maritalStatus"
                value={this.state.maritalStatus}
                onChange={this.onChange}
                label="Marital Status*"
                fullWidth
                helperText="Please select marital status"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {maritalStatuses.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <InputMask
                required
                mask="(+265) 999 999 999"
                value={phone}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    fullWidth
                    helperText="For example: 772 123 456"
                    autoComplete="phone"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="mmRegistered"
                select
                name="mmRegistered"
                value={this.state.mmRegistered}
                onChange={this.onChange}
                label="Mobile Money Registered*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {mmOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="mmPayment"
                select
                name="mmPayment"
                value={this.state.mmPayment}
                onChange={this.onChange}
                label="Receive payments on MM*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {mmPayments.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="district"
                select
                name="district"
                value={this.state.district}
                onChange={this.onChangeDistrict}
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
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="traditionalAuthority"
                select
                name="traditionalAuthority"
                value={this.state.traditionalAuthority}
                onChange={this.onChange}
                label="Traditional Authority"
                fullWidth
                helperText="Please select Traditional Authority"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {options.map(option => (
                  <MenuItem key={option.id} value={option.text}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <br />
              <Typography variant="h5" gutterBottom>
                Farm History and Status
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="yearOpened"
                name="yearOpened"
                value={yearOpened}
                onChange={this.onChange}
                label="Year farm opened"
                type="date"
                fullWidth
                autoComplete="off"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date opened"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    //minDate={new Date("2018-03-01")}
                    maxDate={new Date(Date.now() - 7776000000)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6} sm={6}>
              <NumberFormat
                value={matureTrees}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue } = values;

                  this.setState({ matureTrees: formattedValue });
                }}
                customInput={TextField}
                label="Number of mature trees"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <NumberFormat
                value={immatureTrees}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue } = values;

                  this.setState({ immatureTrees: formattedValue });
                }}
                customInput={TextField}
                label="Number of immature trees"
                helperText="(below 3 years)"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <NumberFormat
                value={hectarage}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue } = values;

                  this.setState({ hectarage: formattedValue });
                }}
                customInput={TextField}
                label="Hectarage under cultivation"
                helperText="(Enter in Acres)"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <br />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                className={classes.saveFarmerButton}
              >
                Save Farmer
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateFarmer);
