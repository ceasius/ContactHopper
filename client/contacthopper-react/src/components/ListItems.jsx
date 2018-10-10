import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Book";
import ShoppingCartIcon from "@material-ui/icons/Contacts";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import SettingsIcon from "@material-ui/icons/Settings";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      theme: "dark"
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleSave = () => {
    this.props.onThemeUpdate(this.state.theme);
    this.setState({
      open: false
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { onRedirectPhoneBooks, onRedirectTables, classes } = this.props;
    return (
      <div>
        <ListItem button onClick={onRedirectPhoneBooks}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Phone Books" />
        </ListItem>
        <ListItem button onClick={onRedirectTables}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Contacts" />
        </ListItem>
        <ListItem button onClick={this.handleOpen}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">User Settings</DialogTitle>
            <DialogContent>
              <TextField
                id="standard-select-theme"
                select
                label="Select"
                className={classes.textField}
                value={this.state.theme}
                onChange={this.handleChange("theme")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select your theme"
                margin="normal"
              >
                <MenuItem key="dark" value="dark">
                  Dark
                </MenuItem>
                <MenuItem key="light" value="light">
                  Light
                </MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleSave}
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

ListItems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListItems);
