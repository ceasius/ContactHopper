import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
    right: 30,
    bottom: 30,
    position: "fixed"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});
class Album extends React.Component {
  handleEdit = phoneBook => {
    const { entry } = this.props;
  };
  state = {
    open: false,
    addNew: false,
    selectedId: 0,
    book: {
      name: "",
      entries: []
    }
  };

  handleEditClick = id => {
    const phone = this.props.phoneBooks.find(e => e.id === id);
    const editObject = { ...phone };
    this.setState({
      addNew: false,
      open: true,
      selectedId: id,
      book: editObject
    });
  };

  handleAddClick = () => {
    const editObject = {
      id: 0,
      name: "",
      entries: []
    };

    this.setState({
      addNew: true,
      open: true,
      selectedId: 0,
      book: editObject
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      selectedId: 0,
      book: {
        id: 0,
        name: "",
        entries: []
      }
    });
  };

  handleViewClick = id => {
    const { onCardSelect, onRedirectTables } = this.props;
    onCardSelect(id);
    onRedirectTables();
  };

  handleChange(event) {
    const temp = { ...this.state.book };
    temp.name = event.target.value;
    this.setState({ book: temp });
  }

  getButtonText = () => {
    if (this.state.addNew) return "Add";
    else return "Update";
  };

  handleSaveClick = () => {
    if (this.state.addNew) {
      this.props.onPhoneBookAdd(this.state.book);
    } else {
      this.props.onPhoneBookUpdate(this.state.book);
    }
    this.handleClose();
  };

  render() {
    const { classes, phoneBooks, onPhoneBookDelete, onCardSelect } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {phoneBooks.map(card => (
                <Grid item key={card.id} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          this.handleViewClick(card.id);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          this.handleEditClick(card.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          onPhoneBookDelete(card.id);
                        }}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              className={classes.button}
              onClick={this.handleAddClick}
            >
              <AddIcon />
            </Button>
          </div>
        </main>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {this.getButtonText()} Phone Book
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="phonebook"
                label="Phonebook Name"
                type="phonebook"
                fullWidth
                onChange={this.handleChange.bind(this)}
                value={this.state.book.name}
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

Album.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Album);
