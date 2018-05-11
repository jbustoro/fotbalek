import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import PropTypes from 'prop-types'
import {
  currentTournamentSelector,
  navActiveKeySelector
} from '../../selectors'
import {
  setNavActiveKey,
  displayMatches,
  displayPlayers,
  displayTournaments,
  setCurrentTournament,
  displayCurrentTournamentLeaderboard,
  displayCurrentTournamentMatches
} from '../../actions/display'
import './NavigationBar.css'

const mapStateToProps = state => ({
  currentTournament: currentTournamentSelector(state.display),
  navActiveKey: navActiveKeySelector(state.display)
})

const mapDispatchToProps = {
  setNavActiveKey,
  displayMatches,
  displayPlayers,
  displayTournaments,
  setCurrentTournament,
  displayCurrentTournamentLeaderboard,
  displayCurrentTournamentMatches
}

class NavigationBar extends Component {
  /*eslint-disable react/prop-types*/
  handleSelect(selectedKey) {
    this.props.setNavActiveKey(selectedKey)
  }

  render() {
    const { currentTournament } = this.props

    return (
      <Navbar staticTop fluid>
        <Navbar.Collapse>
          {currentTournament === null ? (
            <Nav
              activeKey={this.props.navActiveKey}
              onSelect={event => this.handleSelect(event)}
            >
              <NavItem eventKey={1} onClick={() => this.props.displayMatches()}>
                Matches
              </NavItem>
              <NavItem eventKey={2} onClick={() => this.props.displayPlayers()}>
                Players
              </NavItem>
              <NavItem
                eventKey={3}
                onClick={() => this.props.displayTournaments()}
              >
                Tournaments
              </NavItem>
            </Nav>
          ) : (
            <Nav
              activeKey={this.props.navActiveKey}
              onSelect={event => this.handleSelect(event)}
            >
              <NavItem onClick={() => this.props.setCurrentTournament(null)}>
                <FontAwesomeIcon className="ArrowLeft" icon={faArrowLeft} />
              </NavItem>
              <NavItem
                eventKey={1}
                onClick={() => this.props.displayCurrentTournamentLeaderboard()}
              >
                LeaderBoard
              </NavItem>
              <NavItem
                eventKey={2}
                onClick={() => this.props.displayCurrentTournamentMatches()}
              >
                Matches
              </NavItem>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    )
  }
  /*eslint-enable react/prop-types*/
}

Navbar.propTypes = {
  navActiveKey: PropTypes.number,
  setNavActiveKey: PropTypes.func,
  displayMatches: PropTypes.func,
  displayPlayers: PropTypes.func,
  displayTournaments: PropTypes.func,
  currentTournament: PropTypes.string,
  setCurrentTournament: PropTypes.func,
  displayCurrentTournamentLeaderboard: PropTypes.func,
  displayCurrentTournamentMatches: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
