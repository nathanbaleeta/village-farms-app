import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import EditIcon from "@material-ui/icons/Edit";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import MenuItem from "@material-ui/core/MenuItem";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbar";
import firebase from "../common/firebase";

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
    name: "Village",
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
  "Actions"
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
    backgroundColor: "navy"
  }
};

const titles = [
  {
    value: "Prof",
    label: "Prof"
  },
  {
    value: "Dr",
    label: "Dr"
  },
  {
    value: "Mr",
    label: "Mr"
  },
  {
    value: "Ms",
    label: "Ms"
  },
  {
    value: "Mrs",
    label: "Mrs"
  },
  {
    value: "Col",
    label: "Col"
  },
  {
    value: "Capt",
    label: "Capt"
  }
];

const genders = [
  {
    value: "Male",
    label: "Male"
  },
  {
    value: "Female",
    label: "Female"
  }
];

const maritalStatuses = [
  {
    value: "Married",
    label: "Married"
  },
  {
    value: "Single",
    label: "Single"
  },
  {
    value: "Widowed",
    label: "Widowed"
  },
  {
    value: "Separated",
    label: "Separated"
  }
];

const districts = [
  {
    value: "Chitipa",
    label: "Chitipa"
  },
  {
    value: "Rumphi",
    label: "Rumphi"
  },
  {
    value: "Nkhatabay",
    label: "Nkhatabay"
  },
  {
    value: "Mzimba",
    label: "Mzimba"
  },
  {
    value: "Ntchisi",
    label: "Ntchisi"
  }
];

const mmOptions = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];

const mmPayments = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];
class FarmerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false
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
          village: items[item].village,
          traditionalAuthority: items[item].traditionalAuthority,
          district: items[item].district
        });
      }

      console.log(newState);
      this.setState({
        data: newState
      });
    });
  }

  updateFarmer(id) {
    const recordToEdit = this.state.data.find(item => item.id === id);

    this.setState({
      open: true,

      firstname: recordToEdit.firstname,
      lastname: recordToEdit.lastname,
      title: recordToEdit.title,
      sex: recordToEdit.sex,
      maritalStatus: recordToEdit.maritalStatus,
      phone: recordToEdit.phone,
      mmRegistered: recordToEdit.mmRegistered,
      mmPayment: recordToEdit.mmPayment,
      district: recordToEdit.district,
      traditionalAuthority: recordToEdit.traditionalAuthority,
      village: recordToEdit.village
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

  CapitalizeInitial(str) {
    return str.charAt(0).toUpperCase();
  }

  render() {
    const { data } = this.state;
    const { classes } = this.props;

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: false,
      rowsPerPage: 10,
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

        // Perform deletion using Firebase native remove method
        firebase
          .database()
          .ref("farmers")
          .child(id)
          .remove();
      }
    };

    return (
      <React.Fragment>
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
                  textDecoration: "none"
                }}
              >
                {farmer.firstname + " " + farmer.lastname}
              </Link>,
              farmer.title,
              farmer.sex,
              farmer.maritalStatus,
              farmer.village,
              farmer.traditionalAuthority,
              farmer.district,

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
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogContent>
            {/* Edit Farmer form starts here */}

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
                  id="district"
                  select
                  name="district"
                  value={this.state.district}
                  onChange={this.onChange}
                  label="District*"
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
                  onChange={this.onChange}
                  label="Traditional Authority"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} sm={12}>
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

            {/* Edit Farmer Form ends here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FarmerList);
