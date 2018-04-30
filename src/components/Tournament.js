import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import { setCurrentTournament } from '../actions';
import './Tournament.css';

const mapDispatchToProps = {
  setCurrentTournament
};

class Tournament extends Component {
  handleClick(tournamentId) {
    this.props.setCurrentTournament(tournamentId);
  }

  render() {
    const { tournamentId, tournament } = this.props;

    return (
      <div
        className="Tournament"
        onClick={() => this.handleClick(tournamentId)}
        // TODO new route to show tournament leaderboard and matches
      >
        <p className="Tournament-date">
          {dateFormat(tournament.createdAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
        </p>
        <p className="Tournament-active">{tournament.active && 'Active'}</p>
      </div>
    );
  }
}

Tournament.propTypes = {
  tournamentId: PropTypes.string,
  tournament: PropTypes.object,
  setCurrentTournament: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Tournament);
