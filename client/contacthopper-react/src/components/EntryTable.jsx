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
		width: 30,
		height: 30
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
		width: 30,
		height: 30
	},
	purpleAvatar: {
		margin: 10,
		color: "#fff",
		backgroundColor: deepPurple[500],
		width: 30,
		height: 30
	},
	pinkAvatar: {
		margin: 10,
		color: "#fff",
		backgroundColor: pink[500],
		width: 30,
		height: 30
	},
	greenAvatar: {
		margin: 10,
		color: "#fff",
		backgroundColor: green[500],
		width: 30,
		height: 30
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

	buildTableRows = () => {
		let { classes, rows } = this.props;
		if (!rows || 0 === rows.length) return <TableRow key={0} />;
		return rows.map(row => {
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
					<TableCell>
						<div>
							<Button
								variant="fab"
								color="secondary"
								aria-label="edit"
								className={classes.buttonInline}
							>
								<EditIcon />
							</Button>
							<Button
								variant="fab"
								aria-label="delete"
								className={classes.buttonInline}
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
				>
					<AddIcon className={classes.primaryAdd} />
					Add Contact
				</Button>
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
						<TableBody>{this.buildTableRows()}</TableBody>
					</Table>
				</Paper>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(EntryTable);
