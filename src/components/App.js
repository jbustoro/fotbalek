import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import FirebaseAuth from './FirebaseAuth';
import FirebaseData from './FirebaseData';
import SignIn from './SignIn';
import CurrentUser from './CurrentUser';
import Matches from './Matches';
import Players from './Players';
import Tournaments from './Tournaments';
import Navbar from './Navbar';
import {
  ANONYMOUS,
  SIGNED_IN,
  DISPLAY_MATCHES,
  DISPLAY_PLAYERS,
  DISPLAY_TOURNAMENTS
} from '../constants';
import { authStatusSelector, currentItemSelector } from '../selectors';

const mapStateToProps = state => ({
  authStatus: authStatusSelector(state),
  currentItem: currentItemSelector(state)
});

class App extends Component {
  render() {
    const { authStatus, currentItem } = this.props;

    return (
      <div className="App">
        <FirebaseAuth />
        <header>
          <h1 className="App-title">Fotbalek</h1>
          {authStatus === ANONYMOUS && <SignIn />}
        </header>
        <div>
          {authStatus === SIGNED_IN && (
            <div className="container">
              <FirebaseData />
              <CurrentUser />
              <Navbar />
              <div className="Data-container">
                {currentItem === DISPLAY_MATCHES && <Matches />}
                {currentItem === DISPLAY_PLAYERS && <Players />}
                {currentItem === DISPLAY_TOURNAMENTS && <Tournaments />}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  authStatus: PropTypes.string,
  currentItem: PropTypes.string
};

export default connect(mapStateToProps)(App);
