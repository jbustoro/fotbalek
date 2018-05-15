import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ANONYMOUS,
  SIGNED_IN,
  MATCHES,
  PLAYERS,
  TOURNAMENTS,
  CURRENT_TOURNAMENT_LEADERBOARD,
  CURRENT_TOURNAMENT_MATCHES
} from '../../constants'
import { authStatusSelector, currentItemSelector } from '../../selectors'
import FirebaseAuth from '../FirebaseAuth/FirebaseAuth'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import FirebaseData from '../FirebaseData/FirebaseData'
import NavigationBar from '../NavigationBar/NavigationBar'
import Matches from '../Matches/Matches'
import Players from '../Players/Players'
import Tournaments from '../Tournaments/Tournaments'
import TournamentLeaderboard from '../TournamentLeaderboard/TournamentLeaderboard'
import logo from '../../assets/fotbalek.png'
import './App.css'

const mapStateToProps = state => ({
  authStatus: authStatusSelector(state),
  currentItem: currentItemSelector(state)
})

class App extends Component {
  /*eslint-disable indent*/
  render() {
    const { authStatus, currentItem } = this.props

    return (
      <div className="App">
        <FirebaseAuth />
        <header>
          <h1 className="App-title">
            F<img className="App-logo" src={logo} alt="logo" />tbalek
          </h1>
          {authStatus === ANONYMOUS && <SignIn />}
          {authStatus === SIGNED_IN && <SignOut />}
        </header>
        <div>
          {authStatus === SIGNED_IN && (
            <div>
              <FirebaseData />
              <NavigationBar />
              <div className="Data-container">
                {(currentItem === MATCHES ||
                  currentItem === CURRENT_TOURNAMENT_MATCHES) && <Matches />}
                {currentItem === PLAYERS && <Players />}
                {currentItem === TOURNAMENTS && <Tournaments />}
                {currentItem === CURRENT_TOURNAMENT_LEADERBOARD && (
                  <TournamentLeaderboard />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  /*eslint-enable indent*/
}

App.propTypes = {
  authStatus: PropTypes.string,
  currentItem: PropTypes.string
}

export default connect(mapStateToProps)(App)
