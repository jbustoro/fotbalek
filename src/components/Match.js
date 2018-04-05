import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Match.css';

class Match extends Component {
  render() {
    const { match } = this.props;
    const [resultA, resultB] = match.result;
    const { 0: teamA, 1: teamB } = match.teams;
    const { 0: playerA0, 1: playerA1 } = teamA;
    const { 0: playerB0, 1: playerB1 } = teamB;

    return (
      <div className="Match">
        <h4 className="Match--date">{`Played at ${match.playedAt}`}</h4>
        <p className="Match--team">
          <span>TEAM A </span>
          {`Player ${playerA0} & Player ${playerA1}`}
        </p>
        <h3 className="Match--result">{`${resultA} - ${resultB}`}</h3>
        <p className="Match--team">
          <span>TEAM B </span>
          {`Player ${playerB0} & Player ${playerB1}`}
        </p>
      </div>
    );
  }
}

Match.propTypes = {
  match: PropTypes.object
};

export default Match;
