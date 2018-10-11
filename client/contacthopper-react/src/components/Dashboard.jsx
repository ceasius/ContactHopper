import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ListItems from "./ListItems";
import EntryTable from "./EntryTable";
import CardGrid from "./CardGrid";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320,

    alignItems: "left",
    justifyContent: "left"
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    searchFilter: "",
    selectedPhoneBookId: 1,
    redirect: false,
    url: "/"
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleSearchChange = event => {
    this.setState({ searchFilter: event.target.value });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

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

  cardRoute = () => {
    const { onPhoneBookUpdate, onPhoneBookAdd, onPhoneBookDelete } = this.props;
    return (
      <CardGrid
        phoneBooks={this.props.phoneBooks}
        onPhoneBookDelete={onPhoneBookDelete}
        onPhoneBookAdd={onPhoneBookAdd}
        onPhoneBookUpdate={onPhoneBookUpdate}
        onCardSelect={this.selectPhoneBook}
        onRedirectTables={this.redirectTables}
        search={this.state.searchFilter}
      />
    );
  };

  getPhoneBookName = () => {
    const { phoneBooks } = this.props;
    const { selectedPhoneBookId } = this.state;
    const phoneBook = phoneBooks.find(
      phone => phone.id === selectedPhoneBookId
    );
    if (!phoneBook || !phoneBook.name) return "";
    return phoneBook.name;
  };

  createContent = () => {
    const {
      classes,
      phoneBooks,
      onEntryDelete,
      onEntryAdd,
      onEntryUpdate
    } = this.props;
    const { selectedPhoneBookId } = this.state;

    let data = [];
    let phoneBook = {};
    if (!phoneBooks || 0 === phoneBooks.length) {
      if (!this.props.isLoaded)
        return (
          <Typography variant="h4" gutterBottom component="h2">
            Loading
          </Typography>
        );
      else
        return (
          <Typography variant="h4" gutterBottom component="h2">
            No Content
          </Typography>
        );
    }
    phoneBook = phoneBooks.find(phone => phone.id === selectedPhoneBookId);
    if (phoneBook) data = phoneBook.entries;
    const table = (
      <div className={classes.tableContainer}>
        <EntryTable
          phoneBook={phoneBook}
          rows={data}
          isLoaded={this.props.isLoaded}
          search={this.state.searchFilter}
          onEntryDelete={onEntryDelete}
          onEntryAdd={onEntryAdd}
          onEntryUpdate={onEntryUpdate}
        />
      </div>
    );

    return table;
  };

  selectPhoneBook = id => {
    this.setState({ selectedPhoneBookId: id });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift
              )}
            >
              <Toolbar
                disableGutters={!this.state.open}
                className={classes.toolbar}
              >
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  Contact Hopper
                </Typography>
                <div className={classes.grow} />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    onChange={this.handleSearchChange.bind(this)}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose
                )
              }}
              open={this.state.open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItems
                  onRedirectTables={this.redirectTables}
                  onRedirectSettings={this.redirectSettings}
                  onRedirectPhoneBooks={this.redirectPhoneBooks}
                  onThemeUpdate={this.props.onThemeUpdate}
                />
                {this.renderRedirect()}
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <div>
                <Switch>
                  <Route path="/" exact>
                    <Typography variant="h4" gutterBottom component="h2">
                      Phone Books
                    </Typography>
                  </Route>
                  <Route path="/phonebooks/">
                    <Typography variant="h4" gutterBottom component="h2">
                      Phone Books
                    </Typography>
                  </Route>
                  <Route path="/entries/">
                    <Typography variant="h4" gutterBottom component="h2">
                      Contacts: {this.getPhoneBookName()}
                    </Typography>
                  </Route>
                </Switch>
              </div>

              <div>
                <Switch>
                  <Route path="/" component={this.cardRoute} exact />
                  <Route path="/phonebooks/" component={this.cardRoute} />
                  <Route path="/entries/" component={this.createContent} />
                </Switch>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
