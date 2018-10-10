import React, { Component } from "react";
import EntryTable from "./components/EntryTable";
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

class App extends Component {
  state = {
    isloaded: false,
    theme: "dark",
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

  setTheme() {
    if (this.state.theme === "dark") return darktheme;
    else return lighttheme;
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

  fetchPhoneBooksFromApi = () => {};

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
    phoneBook.entries = phoneBook.entries.filter(e => e.id !== id);
    list[index] = phoneBook;
    this.setState({ phoneBooks: list });
  };

  handleEntryAdd = entry => {
    console.log("Entry Add");
  };
  handlePhoneBookAdd = phoneBook => {
    const { phoneBooks } = this.state;
    //todo: remove when integrating with API
    if (phoneBook.id === 0) phoneBook.id = phoneBooks.length + 1;
    const list = [...phoneBooks, phoneBook];
    this.setState({ phoneBooks: list });
  };
  handleEntryEdit = entry => {
    console.log("Entry Edit");
  };
  handlePhoneBookEdit = phoneBook => {
    const { phoneBooks } = this.state;

    const list = [...phoneBooks];
    let index = phoneBooks.findIndex(e => e.id === phoneBook.id);
    let edit = { ...phoneBook };

    list[index] = edit;
    this.setState({ phoneBooks: list });
    console.log(this.state.phoneBooks);
  };

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
      <MuiThemeProvider theme={this.setTheme()}>
        <div className="App">
          <Dashboard
            siteProps={siteProps}
            phoneBooks={phoneBooks}
            isLoaded={false}
            onPhoneBookDelete={this.handlePhoneBookDelete}
            onPhoneBookAdd={this.handlePhoneBookAdd}
            onPhoneBookUpdate={this.handlePhoneBookEdit}
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
