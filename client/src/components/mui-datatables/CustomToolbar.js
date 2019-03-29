import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { Switch, Route } from "react-router-dom";

import CreateFarmer from "../Farmer/CreateFarmer";
import CreateProcurement from "../procurement/CreateProcurement";

const styles = theme => ({
  iconButton: {},
  dialogPaper: {}
});

class CustomToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Register Farmer"}>
          <IconButton className={classes.iconButton} onClick={this.handleOpen}>
            <PersonAddIcon color="default" className={classes.addIcon} />
          </IconButton>
        </Tooltip>

        <Dialog
          id="myDialog"
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogContent>
            <Switch>
              <Route path="/farmers" component={CreateFarmer} />
              <Route path="/procurement" component={CreateProcurement} />
            </Switch>
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

CustomToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { name: "CustomToolbar" })(CustomToolbar);
