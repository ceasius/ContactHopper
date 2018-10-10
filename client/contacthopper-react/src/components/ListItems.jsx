import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Book";
import ShoppingCartIcon from "@material-ui/icons/Contacts";

import SettingsIcon from "@material-ui/icons/Settings";

class ListItems extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			onRedirectPhoneBooks,
			onRedirectTables,
			onRedirectSettings
		} = this.props;
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
				<ListItem button onClick={onRedirectSettings}>
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
