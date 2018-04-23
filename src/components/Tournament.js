import React, { Component } from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import './Tournament.css';

class Tournament extends Component {
  render() {
    const { tournament } = this.props;

    return (
      <div
        className="Tournament"
        onClick={() => console.log('TOURNAMENT CLICKED')}
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
  tournament: PropTypes.object
};

export default Tournament;
