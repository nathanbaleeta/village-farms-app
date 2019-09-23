import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import MenuItem from "@material-ui/core/MenuItem";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbar";
import firebase from "../common/firebase";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { titles } from "../common/titleList";
import { genders } from "../common/genderList";
import { maritalStatuses } from "../common/maritalStatusList";
import { mmOptions } from "../common/mobileMoneyOptions";
import { mmPayments } from "../common/mobileMoneyPayments";
import { districts } from "../common/districtList";
import { lookup } from "../common/traditionalAuthorityList";

const columns = [
  "",
  {
    name: "Fullname",
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: "Title",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Sex",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Marital Status",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Traditional Authority",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "District",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Actions",
    options: {
      filter: false,
      sort: false
    }
  }
];

const styles = {
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#FFA500"
  },
  updateFarmerButton: {
    //background: "mediumblue"
    background: "orange"
  }
};

class FarmerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      traditionalAuthority: "",
      district: "",

      yearOpened: "",
      year1: "",
      year2: "",
      year3: "",
      acreage: "",

      dataValue: "Chitipa"
    };

    this.handleOpen = () => {
      this.setState({ open: true });
    };

    this.handleClose = () => {
      this.setState({ open: false });
    };
  }

  componentDidMount() {
    const farmersRef = firebase.database().ref("farmers");

    farmersRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          firstname: items[item].firstname,
          lastname: items[item].lastname,
          title: items[item].title,
          sex: items[item].sex,
          maritalStatus: items[item].maritalStatus,
          mmRegistered: items[item].mmRegistered,
          mmPayment: items[item].mmPayment,
          phone: items[item].phone,
          traditionalAuthority: items[item].traditionalAuthority,
          district: items[item].district,

          yearOpened: items[item].yearOpened,
          year1: items[item].year1,
          year2: items[item].year2,
          year3: items[item].year3,
          acreage: items[item].acreage
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
      //console.log(this.state.data);
    });
  }

  handleDateChange = date => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    this.setState({
      yearOpened: date.toLocaleDateString("en-US", options)
    });
  };

  updateFarmer(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(recordToEdit);
    this.handleOpen();

    const key = id;
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef.on("value", snapshot => {
      // handle read data.
      //let data = snapshot.val();
      //traditionalAuthority: snapshot.child("traditionalAuthority").val(),
      //console.log(snapshot.child("traditionalAuthority").val());

      this.setState({
        key: snapshot.key,
        firstname: snapshot.child("firstname").val(),
        lastname: snapshot.child("lastname").val(),
        sex: snapshot.child("sex").val(),
        title: snapshot.child("title").val(),
        maritalStatus: snapshot.child("maritalStatus").val(),
        phone: snapshot.child("phone").val(),
        mmRegistered: snapshot.child("mmRegistered").val(),
        mmPayment: snapshot.child("mmPayment").val(),
        traditionalAuthority: snapshot.child("traditionalAuthority").val(),
        district: snapshot.child("district").val(),

        yearOpened: snapshot.child("yearOpened").val(),
        year1: snapshot.child("year1").val(),
        year2: snapshot.child("year2").val(),
        year3: snapshot.child("year3").val(),
        acreage: snapshot.child("acreage").val()
      });
    });
    console.log(
      "############### Veryfing state is working ###################"
    );
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
      firstname: this.toTitleCase(this.state.firstname),
      lastname: this.toTitleCase(this.state.lastname),
      title: this.state.title,
      sex: this.state.sex,
      maritalStatus: this.state.maritalStatus,
      phone: this.state.phone,
      mmRegistered: this.state.mmRegistered,
      mmPayment: this.state.mmPayment,
      district: this.state.district,
      traditionalAuthority: this.state.traditionalAuthority,

      yearOpened: this.state.yearOpened,

      year1: !this.state.year1 ? 0 : this.removeCommas(this.state.year1),
      year2: !this.state.year2 ? 0 : this.removeCommas(this.state.year2),
      year3: !this.state.year3 ? 0 : this.removeCommas(this.state.year3),
      acreage: !this.state.acreage ? 0 : this.removeCommas(this.state.acreage)
    };

    //Update farmer module
    const key = this.state.key;
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef
      .update(farmer)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  onChangeDistrict = e => {
    this.setState({
      dataValue: e.target.value,
      district: e.target.value,
      traditionalAuthority: ""
    });
    //console.log(e.target.value);
  };

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // remove commas before saving to firebase
  removeCommas = num => {
    //Convert number to string before attempting string manipulation
    let str = num.toString();

    // Check if string contains comma before attempting to sanitize
    let result = str.includes(",") ? str.replace(/,/g, "") : str;
    return Number(result);
  };

  CapitalizeInitial(str) {
    return str.charAt(0).toUpperCase();
  }

  render() {
    const { data } = this.state;
    const { classes } = this.props;

    const { dataValue } = this.state;
    const tradAuthorities = lookup[dataValue];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: false,
      rowsPerPage: 5,
      pagination: true,
      customToolbar: () => {
        return <CustomToolbar />;
      },

      // Update farmers
      onRowClick: rowIndex => {
        //console.log(rowIndex);
        //this.handleOpen();
      },
      // Delete farmers
      onRowsDelete: rowsDeleted => {
        // get the corresponding id in state
        const row = rowsDeleted.data[0].index;
        const id = this.state.data[row]["id"];
        console.log(id);

        // Perform farmer deletion and all related objects(advances & procurments)
        firebase
          .database()
          .ref("farmers")
          .child(id)
          .remove();

        firebase
          .database()
          .ref("advances")
          .child(id)
          .remove();

        firebase
          .database()
          .ref("procurement")
          .child(id)
          .remove();
        // Perform farmer deletion and all related objects(advances & procurments)
      }
    };

    return (
      <Fragment>
        <MUIDataTable
          title={"Farmers' list"}
          data={data.map((farmer, index) => {
            return [
              <Avatar className={classes.purpleAvatar}>
                {this.CapitalizeInitial(farmer.firstname) +
                  this.CapitalizeInitial(farmer.lastname)}
              </Avatar>,
              <Link
                to={`/show/${farmer.id}`}
                style={{
                  color: "darkblue",
                  textDecoration: "none",
                  fontSize: 18
                }}
              >
                {farmer.firstname + " " + farmer.lastname}
              </Link>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {farmer.title}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {farmer.sex}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {farmer.maritalStatus}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {farmer.traditionalAuthority}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {farmer.district}
              </div>,

              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateFarmer.bind(this, farmer.id)}
              >
                <EditIcon color="primary" />
              </IconButton>
            ];
          })}
          columns={columns}
          options={options}
        />

        <Dialog
          id="myDialog"
          maxWidth="sm"
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogTitle
            id="simple-dialog-title"
            color="inherit"
            style={{ backgroundColor: "#0000CD" }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "white" }}
            >
              Edit Farmer
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <br />
              <Typography variant="h5" gutterBottom>
                Autobiography
              </Typography>
              <br />
              <Grid container spacing={2}>
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
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="title"
                    select
                    name="title"
                    value={this.state.title}
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
                    mask="(+265) 999 999 999"
                    value={this.state.phone}
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
                        InputLabelProps={{
                          shrink: true
                        }}
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
                    name="traditionalAuthority"
                    value={this.state.traditionalAuthority}
                    select
                    onChange={this.onChange}
                    label="Traditional Authority"
                    fullWidth
                    helperText="Please select Traditional Authority"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {tradAuthorities.map(ta => (
                      <MenuItem key={ta.id} value={ta.text}>
                        {ta.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography variant="h5" gutterBottom>
                    Farm History and Status
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      //margin="normal"
                      id="date-picker-dialog"
                      label="Year Farm opened"
                      format="dd-MM-yyyy"
                      fullWidth
                      value={this.state.yearOpened}
                      defaultValue="dd-mm-yyyy"
                      onChange={this.handleDateChange}
                      maxDate={new Date(Date.now() - 7776000000)} // Disables dates less than 3 months
                      InputLabelProps={{
                        shrink: true
                      }}

                      //InputAdornmentProps={{ position: "end" }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.year1}
                    thousandSeparator={true}
                    onValueChange={values => {
                      const { formattedValue } = values;

                      this.setState({ year1: formattedValue });
                    }}
                    customInput={TextField}
                    label="Year 1"
                    helperText="Tree count which are 1 year"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.year2}
                    thousandSeparator={true}
                    onValueChange={values => {
                      const { formattedValue } = values;

                      this.setState({ year2: formattedValue });
                    }}
                    customInput={TextField}
                    label="Year 2"
                    helperText="Tree count which are 2 years"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.year3}
                    thousandSeparator={true}
                    onValueChange={values => {
                      const { formattedValue } = values;

                      this.setState({ year3: formattedValue });
                    }}
                    customInput={TextField}
                    label="Year 3"
                    helperText="Tree count above 3 years"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.acreage}
                    thousandSeparator={true}
                    onValueChange={values => {
                      const { formattedValue } = values;

                      this.setState({ acreage: formattedValue });
                    }}
                    customInput={TextField}
                    label="Acreage under cultivation"
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
                    color="secondary"
                    className={classes.updateFarmerButton}
                  >
                    Update Farmer
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
      </Fragment>
    );
  }
}

export default withStyles(styles)(FarmerList);
