import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";

import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

import numeral from "numeral";
import firebase from "../common/firebase";

const columns = [
  {
    name: "Fullname",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Advances Type",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Advances Amount",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Commodity Advanced",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Payment mode",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Price per kg",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Total coffee weight",
    options: {
      filter: true,
      sort: true
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
    backgroundColor: "#327F24"
  }
};

class AdvancesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advancesData: []
    };
  }

  componentDidMount() {
    // Get listings advances provided
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();
    query.on("value", snapshot => {
      let advanceInfo = {};
      let newState = [];

      let firstname = "";
      let lastname = "";
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const farmersRef = firebase.database().ref(`farmers/${key}`);

        farmersRef.on("value", farmerSnapshot => {
          firstname = farmerSnapshot.child("firstname").val();
          lastname = farmerSnapshot.child("lastname").val();

          childSnapshot.forEach(grandChildSnapshot => {
            var a = grandChildSnapshot.val();

            advanceInfo = {
              advanceID: childSnapshot.key,
              advanceType: a.advanceType,
              advanceAmount: a.advanceAmount,
              commodityAdvanced: a.commodityAdvanced,
              paymentMode: a.paymentMode,
              pricePerKg: a.pricePerKg,
              totalCoffeeWeight: a.totalCoffeeWeight,
              firstname: firstname,
              lastname: lastname
            };

            // Add advance object to array
            newState.push(advanceInfo);
          });
        });
      });
      this.setState({
        advancesData: newState
      });
      console.log(this.state.advancesData);
    });
  }

  CapitalizeInitial(str) {
    return str.charAt(0).toUpperCase();
  }

  render() {
    const { advancesData } = this.state;

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: false,
      rowsPerPage: 10,
      pagination: true
    };

    return (
      <Fragment>
        <MUIDataTable
          title={"Advances' list"}
          data={advancesData.map((row, index) => {
            return [
              <Link
                to={`/show/${row.advanceID}`}
                style={{
                  color: "darkblue",
                  textDecoration: "none",
                  fontSize: 16
                }}
              >
                {row.firstname + " " + row.lastname}
              </Link>,
              //row.lastname,
              //row.firstname,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.advanceType}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {numeral(row.advanceAmount).format("0,0[.]00")}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.commodityAdvanced}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.paymentMode}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {numeral(row.pricePerKg).format("0,0[.]00")}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {numeral(row.totalCoffeeWeight).format("0,0[.]00")}
              </div>
            ];
          })}
          columns={columns}
          options={options}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(AdvancesList);
