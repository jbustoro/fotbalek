import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import PropTypes from 'prop-types';
import { currentTournamentSelector } from '../selectors';
import {
  displayMatches,
  displayPlayers,
  displayTournaments,
  setCurrentTournament,
  displayCurrentTournamentLeaderboard,
  displayCurrentTournamentMatches
} from '../actions';

const mapStateToProps = state => ({
  currentTournament: currentTournamentSelector(state)
});

const mapDispatchToProps = {
  displayMatches,
  displayPlayers,
  displayTournaments,
  setCurrentTournament,
  displayCurrentTournamentLeaderboard,
  displayCurrentTournamentMatches
};

class NavigationBar extends Component {
  render() {
    const { currentTournament } = this.props;

    return (
      <Navbar staticTop fluid>
        <Navbar.Collapse>
          {currentTournament === null ? (
            <Nav>
              <NavItem onClick={() => this.props.displayMatches()}>
                Matches
              </NavItem>
              <NavItem onClick={() => this.props.displayPlayers()}>
                Players
              </NavItem>
              <NavItem onClick={() => this.props.displayTournaments()}>
                Tournaments
              </NavItem>
            </Nav>
          ) : (
            <Nav>
              <NavItem onClick={() => this.props.setCurrentTournament(null)}>
                <FontAwesomeIcon className="ArrowLeft" icon={faArrowLeft} />
              </NavItem>
              <NavItem
                onClick={() => this.props.displayCurrentTournamentLeaderboard()}
              >
                LeaderBoard
              </NavItem>
              <NavItem
                onClick={() => this.props.displayCurrentTournamentMatches()}
              >
                Matches
              </NavItem>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navbar.propTypes = {
  authStatus: PropTypes.string,
  displayMatches: PropTypes.func,
  displayPlayers: PropTypes.func,
  displayTournaments: PropTypes.func,
  currentTournament: PropTypes.string,
  setCurrentTournament: PropTypes.func,
  displayCurrentTournamentLeaderboard: PropTypes.func,
  displayCurrentTournamentMatches: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
