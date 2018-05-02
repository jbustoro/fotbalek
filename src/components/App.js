import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import FirebaseAuth from './FirebaseAuth';
import FirebaseData from './FirebaseData';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Matches from './Matches';
import Players from './Players';
import Tournaments from './Tournaments';
import NavigationBar from './NavigationBar';
import {
  ANONYMOUS,
  SIGNED_IN,
  DISPLAY_MATCHES,
  DISPLAY_PLAYERS,
  DISPLAY_TOURNAMENTS,
  DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD,
  DISPLAY_CURRENT_TOURNAMENT_MATCHES
} from '../constants';
import { authStatusSelector, currentItemSelector } from '../selectors';
import CurrentTournamentLeaderboard from './CurrentTournamentLeaderboard';

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
          {authStatus === SIGNED_IN && <SignOut />}
        </header>
        <div>
          {authStatus === SIGNED_IN && (
            <div>
              <FirebaseData />
              <NavigationBar />
              <div className="Data-container">
                {(currentItem === DISPLAY_MATCHES ||
                  currentItem === DISPLAY_CURRENT_TOURNAMENT_MATCHES) && (
                  <Matches />
                )}
                {currentItem === DISPLAY_PLAYERS && <Players />}
                {currentItem === DISPLAY_TOURNAMENTS && <Tournaments />}
                {currentItem === DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD && (
                  <CurrentTournamentLeaderboard />
                )}
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
