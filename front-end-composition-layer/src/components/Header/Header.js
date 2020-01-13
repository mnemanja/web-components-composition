import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 64,
  },
  flex: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    marginLeft: 20,
    marginRight: -12,
  },
  title: {
    marginRight: 50,
  },
};

export class Header extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <div className={this.props.classes.flex}>
              <Typography variant="title" color="inherit" className={this.props.classes.title}>
                Web components example
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(Header));
