import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  avatar: {
    margin: 10,
    width: 40,
    height: 40
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonInline: {
    margin: theme.spacing.unit,
    width: 40,
    height: 40
  },
  primaryAdd: {
    justifyContent: "left"
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500],
    width: 40,
    height: 40
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500],
    width: 40,
    height: 40
  },
  pinkAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: pink[500],
    width: 40,
    height: 40
  },
  greenAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: green[500],
    width: 40,
    height: 40
  }
});
const nameLabel = "Contact Name";
const numberLabel = "Phone Number";
class EntryTable extends Component {
  state = {
    open: false,
    addNew: false,
    selectedId: 0,
    validName: false,
    validNumber: true,
    nameInput: "*",
    entry: {
      id: 0,
      name: "",
      phoneNumber: ""
    }
  };

  getAvatarText = name => {
    if (!name || 0 === name.length) return "";
    return name[0];
  };
  getAvatarColor = id => {
    const { classes } = this.props;
    const mod = id % 5;
    switch (mod) {
      case 1:
        return classes.orangeAvatar;
      case 2:
        return classes.purpleAvatar;
      case 3:
        return classes.greenAvatar;
      case 4:
        return classes.pinkAvatar;
      default:
        return classes.avatar;
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
      selectedId: 0,
      book: {
        id: 0,
        name: "",
        phoneNumber: "",
        phoneBookId: 0
      }
    });
  };

  handleEditClick = id => {
    const lookup = this.props.rows.find(e => e.id === id);
    const editObject = { ...lookup };
    this.setState({
      addNew: false,
      open: true,
      validName: true,
      validNumber: true,
      nameInput: "*",
      numberInput: "*",
      selectedId: id,
      entry: editObject
    });
  };

  handleAddClick = () => {
    const editObject = {
      id: 0,
      name: "",
      phoneNumber: "",
      phoneBookId: this.props.phoneBook.id
    };

    this.setState({
      addNew: true,
      open: true,
      selectedId: 0,
      validName: false,
      validNumber: false,
      nameInput: "*",
      numberInput: "*",
      entry: editObject
    });
  };

  handleNameChange(event) {
    const temp = { ...this.state.entry };
    temp.name = event.target.value;
    this.validateName(temp.name);
    this.setState({ entry: temp });
  }

  validateName(name) {
    if (name === null) {
      this.setState({
        validName: false,
        nameInput: "*"
      });
      return;
    }

    if (name === "") {
      this.setState({
        validName: false,
        nameInput: "*"
      });
      return;
    }
    this.setState({
      validName: true,
      nameInput: ""
    });
  }

  handleNumberChange(event) {
    const temp = { ...this.state.entry };
    temp.phoneNumber = event.target.value;
    this.validateNumber(temp.phoneNumber);
    this.setState({ entry: temp });
  }

  validateNumber(number) {
    if (number === null || number === "") {
      this.setState({
        validNumber: false,
        numberInput: "*"
      });
      return;
    }
    const text = number.replace("+", "");
    if (isNaN(text) || text.length < 8 || text.length > 15) {
      this.setState({
        validNumber: false,
        numberInput: ": Invalid Number"
      });
      return;
    }
    this.setState({
      validNumber: true,
      numberInput: ""
    });
  }

  getButtonText = () => {
    if (this.state.addNew) return "Add";
    else return "Update";
  };

  handleSaveClick = () => {
    if (this.state.addNew) {
      this.props.onEntryAdd(this.state.entry);
    } else {
      this.props.onEntryUpdate(this.state.entry);
    }
    this.handleClose();
  };

  buildTableRows = () => {
    let { classes, rows, onEntryDelete, search } = this.props;
    if (!rows || 0 === rows.length) return <TableRow key={0} />;

    const filteredRows = rows.filter(e =>
      e.name.toUpperCase().includes(search.toUpperCase())
    );
    return filteredRows.map(row => {
      return (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            <Avatar className={this.getAvatarColor(row.id)}>
              {this.getAvatarText(row.name)}
            </Avatar>
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell numeric>{row.phoneNumber}</TableCell>
          <TableCell>
            <div>
              <Button
                variant="fab"
                color="secondary"
                aria-label="edit"
                className={classes.buttonInline}
                onClick={() => {
                  this.handleEditClick(row.id);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                variant="fab"
                aria-label="delete"
                className={classes.buttonInline}
                onClick={() => {
                  onEntryDelete(row.phoneBookId, row.id);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      );
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button
          variant="extendedFab"
          aria-label="primary"
          color="primary"
          className={classes.button}
          onClick={() => {
            this.handleAddClick();
          }}
        >
          <AddIcon className={classes.primaryAdd} />
          Add Contact
        </Button>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Contact Name</TableCell>
                <TableCell numeric>Phone Number</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>{this.buildTableRows()}</TableBody>
          </Table>
        </Paper>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {this.getButtonText()} Contact Entry
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="entryname"
                label={nameLabel + this.state.nameInput}
                error={!this.state.validName}
                type="entryname"
                fullWidth
                onChange={this.handleNameChange.bind(this)}
                value={this.state.entry.name}
              />
              <TextField
                margin="dense"
                id="entrynumber"
                type="phonenumber"
                label={numberLabel + this.state.numberInput}
                error={!this.state.validNumber}
                fullWidth
                onChange={this.handleNumberChange.bind(this)}
                value={this.state.entry.phoneNumber}
              />
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
                onClick={this.handleSaveClick}
                color="primary"
                variant="contained"
                disabled={!(this.state.validName && this.state.validNumber)}
              >
                {this.getButtonText()}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EntryTable);
