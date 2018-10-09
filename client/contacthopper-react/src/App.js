import React, { Component } from "react";
import EntryTable from "./components/EntryTable";
import "./App.css";
import Dashboard from "./components/Dashboard";

class App extends Component {
	state = {
		phoneBooks: [
			{
				id: 1,
				name: "Family",
				entries: [
					{ id: 1, name: "Mom", phoneNumber: "0833452690" },
					{ id: 2, name: "Dad", phoneNumber: "0833452691" },
					{ id: 3, name: "Wife", phoneNumber: "0833452692" },
					{ id: 4, name: "Son", phoneNumber: "0833452693" },
					{ id: 5, name: "Lead", phoneNumber: "0833452694" },
					{ id: 6, name: "Friend", phoneNumber: "0833452695" },
					{ id: 7, name: "New Guy", phoneNumber: "0833452696" }
				]
			},
			{
				id: 2,
				name: "Work",
				entries: [
					{ id: 5, name: "Lead", phoneNumber: "0833452694" },
					{ id: 6, name: "Friend", phoneNumber: "0833452695" },
					{ id: 7, name: "New Guy", phoneNumber: "0833452696" }
				]
			}
		]
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		/*fetch("https://localhost:5001/api/phonebooks/")
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					items: json
				});
			});
			*/
	}

	render() {
		const { phoneBooks } = this.state;
		let { items, isLoaded } = this.state;
		isLoaded = true;
		let content = {};
		if (!isLoaded) {
			content = <div>Loading</div>;
		} else {
			content = (
				<React.Fragment>
					<EntryTable rows={phoneBooks[0].entries} table="m-10" />
				</React.Fragment>
			);
		}
		let siteProps = {
			header: "Contact List: Family"
		};
		return (
			<div className="App">
				<Dashboard siteProps={siteProps} phoneBooks={phoneBooks} />
			</div>
		);
		/*
		return (
			<div className="App">
				<NavBar />
				{content}
			</div>
    );
    */
	}
}

export default App;
