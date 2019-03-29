import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbar";
import firebase from "../common/firebase";

const columns = [
  "",
  {
    name: "Name",
    options: {
      filter: true,
      sort: true
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
    backgroundColor: deepPurple[500]
  }
};

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
          title: items[item].title,
          name: items[item].name,
          sex: items[item].sex,
          maritalStatus: items[item].maritalStatus,
          village: items[item].village,
          traditionalAuthority: items[item].traditionalAuthority,
          district: items[item].district
        });
      }
      this.setState({
        data: newState
      });
    });
  }

  updateFarmer(id) {
    const recordToEdit = this.state.data.find(item => item.id === id);

    this.setState({
      open: true,

      name: recordToEdit.name,
      title: recordToEdit.title,
      sex: recordToEdit.sex,
      maritalStatus: recordToEdit.maritalStatus,
      mmRegistered: recordToEdit.mmRegistered,
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
          title={"Procurement list"}
          data={data.map((farmer, index) => {
            return [
              <Avatar className={classes.purpleAvatar}>
                <ShoppingCartIcon />
              </Avatar>,

              <Link
                to={`/farmers/${farmer.id}`}
                style={{
                  color: "darkblue",
                  textDecoration: "none"
                }}
              >
                {farmer.name}
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
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  value={this.state.name}
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
