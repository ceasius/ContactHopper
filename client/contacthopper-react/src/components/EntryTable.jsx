import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";

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
  },
  pinkAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: pink[500]
  },
  greenAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: green[500]
  }
});

class EntryTable extends Component {
  state = {};
  getAvatarText = name => {
    if (!name || 0 === name.length) return "";
    return name[0];
  };
  getAvatarColor = id => {
    const { classes } = this.props;
    const mod = id % 5;
    console.log(mod);
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
  render() {
    const { classes, rows } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell numeric>ID</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell numeric>Phone Number</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Avatar className={this.getAvatarColor(row.id)}>
                      {this.getAvatarText(row.name)}
                    </Avatar>
                  </TableCell>
                  <TableCell numeric>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell numeric>{row.phoneNumber}</TableCell>
                  <TableCell />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(EntryTable);
