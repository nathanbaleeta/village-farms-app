import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import MenuItem from "@material-ui/core/MenuItem";

import MUIDataTable from "mui-datatables";
import CustomToolbarSales from "../mui-datatables/CustomToolbarSales";
import firebase from "../common/firebase";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

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
    name: "Address",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Goods Purchased",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Phone",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Unit Price",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Quantity",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Total price",
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
  }
};

const goods = [
  {
    value: "Coffee",
    label: "Coffee"
  },
  {
    value: "Bananas",
    label: "Bananas"
  },
  {
    value: "Vegetables",
    label: "Vegetables"
  },
  {
    value: "Vegetables",
    label: "Vegetables"
  },
  {
    value: "Pigs",
    label: "Pigs"
  },
  {
    value: "Chickens",
    label: "Chickens"
  }
];

class SalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
      firstname: "",
      lastname: "",
      address: "",
      goodsPurchased: "",
      phone: "",
      unitPrice: "",
      quantity: "",
      totalPrice: ""
    };

    this.handleOpen = () => {
      this.setState({ open: true });
    };

    this.handleClose = () => {
      this.setState({ open: false });
    };
  }

  componentDidMount() {
    const salesRef = firebase.database().ref("sales");

    salesRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          firstname: items[item].firstname,
          lastname: items[item].lastname,
          address: items[item].address,
          goodsPurchased: items[item].goodsPurchased,
          phone: items[item].phone,
          unitPrice: items[item].unitPrice,
          quantity: items[item].quantity,
          totalPrice: items[item].totalPrice
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
    });
  }

  updateSale(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(id);
    this.handleOpen();

    const key = id;
    const salesRef = firebase.database().ref(`sales/${key}`);
    salesRef.on("value", snapshot => {
      // handle read data.
      //let data = snapshot.val();
      //this.setState(data);

      this.setState({
        key: snapshot.key,
        firstname: snapshot.child("firstname").val(),
        lastname: snapshot.child("lastname").val(),
        address: snapshot.child("address").val(),
        goodsPurchased: snapshot.child("goodsPurchased").val(),
        phone: snapshot.child("phone").val(),
        unitPrice: snapshot.child("unitPrice").val(),
        quantity: snapshot.child("quantity").val(),
        totalPrice: snapshot.child("totalPrice").val()
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

  handleCalculateTotalPrice = () => {
    this.setState({
      totalPrice: this.state.quantity * this.state.unitPrice
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const sale = {
      firstname: this.capitalize(this.state.firstname),
      lastname: this.capitalize(this.state.lastname),
      goodsPurchased: this.state.goodsPurchased,
      address: this.state.address,
      phone: this.state.phone,
      unitPrice: this.state.unitPrice,
      quantity: this.state.quantity,
      totalPrice: this.state.totalPrice
    };

    //Update farmer module
    const key = this.state.key;
    const farmersRef = firebase.database().ref(`sales/${key}`);
    farmersRef
      .update(sale)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
        return <CustomToolbarSales />;
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

        // Perform sale deletion and cascade if necessary
        firebase
          .database()
          .ref("sales")
          .child(id)
          .remove();
      }
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Sales list"}
          data={data.map((sale, index) => {
            return [
              <Avatar className={classes.purpleAvatar}>
                {this.CapitalizeInitial(sale.firstname) +
                  this.CapitalizeInitial(sale.lastname)}
              </Avatar>,
              <Link
                //to={`/show/${sale.id}`}
                to={"#"}
                style={{
                  color: "darkblue",
                  textDecoration: "none"
                }}
              >
                {sale.firstname + " " + sale.lastname}
              </Link>,
              sale.address,
              sale.goodsPurchased,
              sale.phone,
              sale.unitPrice,
              sale.quantity,
              sale.totalPrice,

              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateSale.bind(this, sale.id)}
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
            color="default"
            style={{ backgroundColor: "#483D8B" }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Edit Sale
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <br />

              <Typography variant="headline" align="left" color="inherit">
                Sales Record
              </Typography>
              <br />
              <br />

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
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="address"
                    name="address"
                    label="Address"
                    multiline
                    rowsMax="4"
                    fullWidth
                    helperText="Press enter to achieve multiple lines"
                    value={this.state.address}
                    onChange={this.onChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="goodsPurchased"
                    select
                    name="goodsPurchased"
                    value={this.state.goodsPurchased}
                    onChange={this.onChange}
                    label="Goods purchased*"
                    fullWidth
                    helperText="Please select option"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {goods.map(option => (
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
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="unitPrice"
                    name="unitPrice"
                    value={this.state.unitPrice}
                    onChange={this.onChange}
                    label="Unit Price"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="quantity"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.onChange}
                    label="Quantity"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="totalPrice"
                    name="totalPrice"
                    value={this.state.totalPrice}
                    onClick={this.handleCalculateTotalPrice}
                    label="Total Price"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="secondary"
                  >
                    Update Sale
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SalesList);
