import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Book";
import ShoppingCartIcon from "@material-ui/icons/Contacts";

import SettingsIcon from "@material-ui/icons/Settings";
import { Redirect } from "react-router-dom";

class ListItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			url: "/"
		};
	}
	redirectPhoneBooks = () => {
		this.setState({
			redirect: true,
			url: "/phonebooks/"
		});
	};
	redirectTables = () => {
		this.setState({
			redirect: true,
			url: "/entries/"
		});
	};
	redirectSettings = () => {
		this.setState({
			redirect: true,
			url: "/"
		});
	};
	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to={this.state.url} />;
		}
	};
	render() {
		return (
			<div>
				{this.renderRedirect()}
				<ListItem button onClick={this.redirectPhoneBooks}>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
				<ListItem button onClick={this.redirectTables}>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary="Contacts" />
				</ListItem>
				<ListItem button onClick={this.redirectSettings}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="Settings" />
				</ListItem>
			</div>
		);
	}
}

export default ListItems;
