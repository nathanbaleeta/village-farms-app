import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import firebase from "../common/firebase";

import CustomToolbar from "../mui-datatables/CustomToolbar";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";

import { Link } from "react-router-dom";

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
      data: []
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

      // Delete farmers
      onRowsDelete: rowsDeleted => {
        const row = rowsDeleted.data[0].index;
        const id = this.state.data[row]["id"];
        console.log(id);

        firebase
          .database()
          .ref("farmers")
          .child(id)
          .remove();
      }
    };

    //firebase.database().ref('farmers').child('-LYfjM1Pqt5IUEqw2IoQ').remove();
    // const farmersRef = firebase.database().ref("farmers");
    //database.ref("users/456id").remove();

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Farmers' list"}
          data={data.map(farmer => {
            return [
              <Avatar className={classes.purpleAvatar}>
                {this.CapitalizeInitial(farmer.name)}
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

              <IconButton color="primary">
                <EditIcon color="primary" />
              </IconButton>
            ];
          })}
          columns={columns}
          options={options}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FarmerList);
