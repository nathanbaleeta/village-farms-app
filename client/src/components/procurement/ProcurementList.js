import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import firebase from "../common/firebase";

import deepOrange from "@material-ui/core/colors/deepOrange";

const columns = [
  {
    name: "Fullname",
    options: {
      filter: true,
      sort: true
    }
  },
  /*{
    name: "Advance Balance",
    options: {
      filter: true,
      sort: true
    }
  },*/
  {
    name: "Coffee type",
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
    name: "Today value sale",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Value of sale liability",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Weight",
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

class ProcurementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procurementData: []
      //advanceBalance: ""
    };
  }

  componentDidMount() {
    // Get listings advances provided
    const query = firebase
      .database()
      .ref("procurement")
      .orderByKey();
    query.on("value", snapshot => {
      let procureInfo = {};
      let newState = [];

      let firstname = "";
      let lastname = "";
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const farmersRef = firebase.database().ref(`farmers/${key}`);

        /********************** Retrieve advance balance *********************/
        /*
        const advanceRef = firebase
          .database()
          .ref(`advances/${key}`)
          .orderByKey();
        advanceRef.on("value", snapshot => {
          let advanceCounter = 0;
          snapshot.forEach(function(childSnapshot) {
            // Mature trees counter; convert string to int
            advanceCounter =
              advanceCounter +
              parseInt(childSnapshot.child("advanceAmount").val());
          });
          this.setState({
            advanceBalance: advanceCounter
          });
          //console.log(this.state.advanceBalance);
          console.log(advanceCounter);
        });
        */
        /********************** Retrieve advance balance *********************/

        farmersRef.on("value", farmerSnapshot => {
          firstname = farmerSnapshot.child("firstname").val();
          lastname = farmerSnapshot.child("lastname").val();

          childSnapshot.forEach(grandChildSnapshot => {
            var p = grandChildSnapshot.val();

            procureInfo = {
              procureID: childSnapshot.key,
              //advanceBalance: this.state.advanceBalance,
              cashAvailabletoday: p.cashAvailabletoday,
              coffeeType: p.coffeeType,
              pricePerKg: p.pricePerKg,
              todayValueSale: p.todayValueSale,
              valueOfSaleLiability: p.valueOfSaleLiability,
              weight: p.weight,
              toPayNow: p.payNow,
              amountPaid: p.amountPaid,
              outstandingBalance: p.outstandingBalance,

              firstname: firstname,
              lastname: lastname
            };

            // Add advance object to array
            newState.push(procureInfo);
          });
        });
      });
      this.setState({
        procurementData: newState
      });
      console.log(this.state.procurementData);
    });
  }

  CapitalizeInitial(str) {
    return str.charAt(0).toUpperCase();
  }

  render() {
    const { procurementData } = this.state;

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
          title={"Procurement list"}
          data={procurementData.map((row, index) => {
            return [
              <Link
                to={`/show/${row.procureID}`}
                style={{
                  color: "darkblue",
                  textDecoration: "none",
                  fontSize: 16
                }}
              >
                {row.firstname + " " + row.lastname}
              </Link>,
              //row.advanceBalance,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.coffeeType}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.pricePerKg}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.todayValueSale}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.valueOfSaleLiability}
              </div>,
              <div
                style={{
                  fontSize: 16
                }}
              >
                {row.weight}
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

export default withStyles(styles)(ProcurementList);
