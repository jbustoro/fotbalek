import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayMatches, displayPlayers, displayTournaments } from '../actions';
import './Navbar.css';

const mapDispatchToProps = {
  displayMatches,
  displayPlayers,
  displayTournaments
};

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <button onClick={() => this.props.displayMatches()}>Matches</button>
        <button onClick={() => this.props.displayPlayers()}>Players</button>
        <button onClick={() => this.props.displayTournaments()}>
          Tournaments
        </button>
      </div>
    );
  }
}

Navbar.propTypes = {
  displayMatches: PropTypes.func,
  displayPlayers: PropTypes.func,
  displayTournaments: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Navbar);
