import React, { Component } from "react";
import EntryTable from "./components/EntryTable";
import "./App.css";
import Dashboard from "./components/Dashboard";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

const muitheme = createMuiTheme({
	palette: {
		type: "dark",
		primary: pink,
		secondary: pink,
		error: red,
		contrastThreshold: 3,
		tonalOffset: 0.4
	},
	typography: {
		useNextVariants: true
	}
});

class App extends Component {
	state = {
		isloaded: false,
		phoneBooks: [
			{
				id: 1,
				name: "Family",
				entries: [
					{ id: 1, name: "Mom", phoneNumber: "0833452690", phoneBookId: 1 },
					{ id: 2, name: "Dad", phoneNumber: "0833452691", phoneBookId: 1 },
					{ id: 3, name: "Wife", phoneNumber: "0833452692", phoneBookId: 1 },
					{ id: 4, name: "Son", phoneNumber: "0833452693", phoneBookId: 1 },
					{ id: 5, name: "Lead", phoneNumber: "0833452694", phoneBookId: 1 },
					{ id: 6, name: "Friend", phoneNumber: "0833452695", phoneBookId: 1 },
					{ id: 7, name: "New Guy", phoneNumber: "0833452696", phoneBookId: 1 }
				]
			},
			{
				id: 2,
				name: "Work",
				entries: [
					{ id: 5, name: "Lead", phoneNumber: "0833452694", phoneBookId: 2 },
					{ id: 6, name: "Friend", phoneNumber: "0833452695", phoneBookId: 2 },
					{ id: 7, name: "New Guy", phoneNumber: "0833452696", phoneBookId: 2 }
				]
			}
		]
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		/*
    fetch("https://localhost:44320/api/phonebooks/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      })
      .then(() => {
        console.log(this.state.isLoaded);
        console.log(this.state.items);
      });
      */
	}

	handlePhoneBookDelete = id => {
		const { phoneBooks } = this.state;
		let list = [...phoneBooks];
		list = list.filter(e => e.id !== id);
		this.setState({ phoneBooks: list });
	};

	handleEntryDelete = (phoneBookId, id) => {
		const { phoneBooks } = this.state;
		const index = phoneBooks.findIndex(e => e.id === phoneBookId);
		const result = phoneBooks[index];
		const list = [...phoneBooks];
		let phoneBook = { ...result };
		console.log(phoneBookId);
		console.log(phoneBook);
		phoneBook.entries = phoneBook.entries.filter(e => e.id !== id);
		list[index] = phoneBook;
		this.setState({ phoneBooks: list });
	};

	handleEntryAdd = entry => {};
	handlePhoneBookAdd = phoneBook => {
		const { phoneBooks } = this.state;
		const list = [...phoneBooks, phoneBook];
		this.setState({ phoneBooks: list });
	};
	handleEntryEdit = entry => {};
	handlePhoneBookEdit = phoneBook => {};

	render() {
		const { phoneBooks } = this.state;
		let { items, isloaded } = this.state;
		isloaded = true;
		let content = {};
		if (!isloaded) {
			content = <div>Loading</div>;
		} else {
		}
		let siteProps = {
			header: "Contact List: Family"
		};
		return (
			<MuiThemeProvider theme={muitheme}>
				<div className="App">
					<Dashboard
						siteProps={siteProps}
						phoneBooks={phoneBooks}
						isLoaded={false}
						onPhoneBookDelete={this.handlePhoneBookDelete}
						onPhoneBookAdd={this.handleEntryAdd}
						onPhoneBookUpdate={this.handleEntryEdit}
						onEntryDelete={this.handleEntryDelete}
						onEntryAdd={this.handleEntryAdd}
						onEntryUpdate={this.handleEntryEdit}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
