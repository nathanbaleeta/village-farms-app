import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Nathan extends Component {
  state = {
    districts: [
      {
        name: "Chitipa",
        traditionalAuthorities: [
          "Kameme",
          "Mwabulambya",
          "Mwenemisuku",
          "Mwenewenya",
          "Nthalire"
        ]
      },
      {
        name: "Ntchisi",
        traditionalAuthorities: [
          "Chikho",
          "Chilooko",
          "Kalumo",
          "Kasakula",
          "Ntchisi Boma",
          "Nthondo"
        ]
      },
      {
        name: "Rumphi",
        traditionalAuthorities: [
          "Chikulamayembe",
          "Chipinduka",
          "Kachulu",
          "Mwahenga",
          "Mwalweni",
          "Mwamlowe",
          "Mwankhunikira",
          "Nyika National Park",
          "Rumphi Boma",
          "Vwaza Game Reserve",
          "Zolokere"
        ]
      }
    ],
    selectedDistrict: "Chitipa"
  };

  handleChange = e => {
    console.log(this.state);
    this.setState({ selectedDistrict: e.target.value });
  };

  render() {
    let district = this.state.districts.filter(district => {
      return district.name === this.state.selectedDistrict;
    });
    return (
      <Fragment>
        District
        <select
          value={this.state.selectedDistrict}
          onChange={this.handleChange.bind(this)}
        >
          {this.state.districts.map((district, i) => {
            return <option>{district.name}</option>;
          })}
        </select>
        Traditional Authority
        <select>
          {district[0].traditionalAuthorities.map((ta, i) => {
            return <option>{ta}</option>;
          })}
        </select>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Nathan);
