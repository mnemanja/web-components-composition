import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Units from './screens/Units/Units';
import Header from './components/Header/Header';

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      componentExists: false,
    };
  }

  getChildContext() {
    return {
      listService: 'http://localhost:5001/',
    };
  }

  render() {
    return (
      <div className="App">
        <Header />

        <Units />
      </div>
    );
  }
}

App.childContextTypes = {
  listService: PropTypes.string,
};

const mapDispatch = ({ user }) => {
  return {
    loadUser: user.fetchUser,
  };
};

export default withRouter(connect(null, mapDispatch)(App));
