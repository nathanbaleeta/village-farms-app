import React from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import HighchartsReact from "highcharts-react-official";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class Demo3 extends React.Component {
  constructor() {
    super();
    this.state = {
      chartOptions: {
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: "Contents of Highsoft's weekly fruit delivery"
        },
        subtitle: {
          text: "3D donut in Highcharts"
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: "Delivered amount",
            data: [
              ["Bananas", 8],
              ["Kiwi", 3],
              ["Mixed nuts", 1],
              ["Oranges", 6],
              ["Apples", 8],
              ["Pears", 4],
              ["Clementines", 4],
              ["Reddish (bag)", 1],
              ["Grapes (bunch)", 1]
            ]
          }
        ]
      }
    };
  }
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    const { chartOptions } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

Demo3.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Demo3);
