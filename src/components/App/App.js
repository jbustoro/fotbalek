import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ANONYMOUS,
  SIGNED_IN,
  DISPLAY_MATCHES,
  DISPLAY_PLAYERS,
  DISPLAY_TOURNAMENTS,
  DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD,
  DISPLAY_CURRENT_TOURNAMENT_MATCHES
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
                {(currentItem === DISPLAY_MATCHES ||
                  currentItem === DISPLAY_CURRENT_TOURNAMENT_MATCHES) && (
                  <Matches />
                )}
                {currentItem === DISPLAY_PLAYERS && <Players />}
                {currentItem === DISPLAY_TOURNAMENTS && <Tournaments />}
                {currentItem === DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD && (
                  <TournamentLeaderboard />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  authStatus: PropTypes.string,
  currentItem: PropTypes.string
}

export default connect(mapStateToProps)(App)
