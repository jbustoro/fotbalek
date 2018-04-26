import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { displayMatches, displayPlayers, displayTournaments } from '../actions';

const mapDispatchToProps = {
  displayMatches,
  displayPlayers,
  displayTournaments
};

class NavigationBar extends Component {
  render() {
    return (
      <Navbar staticTop fluid>
        <Navbar.Collapse>
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
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navbar.propTypes = {
  authStatus: PropTypes.string,
  displayMatches: PropTypes.func,
  displayPlayers: PropTypes.func,
  displayTournaments: PropTypes.func
};

export default connect(null, mapDispatchToProps)(NavigationBar);
