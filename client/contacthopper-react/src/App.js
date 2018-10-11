import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import purple from "@material-ui/core/colors/deepPurple";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

const darktheme = createMuiTheme({
	palette: {
		type: "dark",
		primary: purple,
		secondary: pink,
		error: red,
		contrastThreshold: 3,
		tonalOffset: 0.4
	},
	typography: {
		useNextVariants: true
	}
});

const lighttheme = createMuiTheme({
	palette: {
		type: "light",
		primary: indigo,
		secondary: pink,
		error: red,
		contrastThreshold: 3,
		tonalOffset: 0.4
	},
	typography: {
		useNextVariants: true
	}
});

const url = "https://localhost:44320/api/";

class App extends Component {
	state = {
		isLoaded: false,
		items: [],
		theme: "dark",
		phoneBooks: []
	};

	setTheme() {
		if (this.state.theme === "dark") return darktheme;
		else return lighttheme;
	}

	updateTheme = theme => {
		this.setState({ theme: theme });
	};

	componentDidMount() {
		this.fetchPhoneBooks();
	}

	fetchPhoneBooks = () => {
		fetch(url + "phonebooks/")
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					phoneBooks: json
				});
			})
			.catch(err => console.log(err));
	};

	handlePhoneBookDelete = id => {
		fetch(url + "phonebooks/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.fetchPhoneBooks();
			})
			.catch(err => console.log(err));
	};

	handleEntryDelete = (phoneBookId, id) => {
		fetch(url + "entries/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.fetchPhoneBooks();
			})
			.catch(err => console.log(err));
	};

	handleEntryAdd = entry => {
		fetch(url + "entries/", {
			method: "POST",
			body: JSON.stringify(entry),
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.fetchPhoneBooks();
			})
			.catch(err => console.log(err));
	};
	handlePhoneBookAdd = phoneBook => {
		fetch(url + "phonebooks/", {
			method: "POST",
			body: JSON.stringify(phoneBook),
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.fetchPhoneBooks();
			})
			.catch(err => console.log(err));
	};
	handleEntryEdit = entry => {
		fetch(url + "entries/" + entry.id, {
			method: "PUT",
			body: JSON.stringify(entry),
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.fetchPhoneBooks();
			})
			.catch(err => console.log(err));
	};
	handlePhoneBookEdit = phoneBook => {
		fetch(url + "phonebooks/" + phoneBook.id, {
			method: "PUT",
			body: JSON.stringify(phoneBook),
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.fetchPhoneBooks();
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<MuiThemeProvider theme={this.setTheme()}>
				<div className="App">
					<Dashboard
						phoneBooks={this.state.phoneBooks}
						isLoaded={this.state.isLoaded}
						onPhoneBookDelete={this.handlePhoneBookDelete}
						onPhoneBookAdd={this.handlePhoneBookAdd}
						onPhoneBookUpdate={this.handlePhoneBookEdit}
						onEntryDelete={this.handleEntryDelete}
						onEntryAdd={this.handleEntryAdd}
						onEntryUpdate={this.handleEntryEdit}
						onThemeUpdate={this.updateTheme}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
