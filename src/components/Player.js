import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Player.css';

class Player extends Component {
  render() {
    const { player } = this.props;

    return (
      <div className="Player">
        <li>{`Device token: ${player.deviceToken}`}</li>
        <li>{`Goals against: ${player.goalsAgainst}`}</li>
        <li>{`Goals for: ${player.goalsFor}`}</li>
        <li>{`Loses: ${player.loses}`}</li>
        <li>{`Name: ${player.name}`}</li>
        <li>{`Order: ${player.order}`}</li>
        <li>{`Rating: ${player.rating}`}</li>
        <li>{`Sigma: ${player.sigma}`}</li>
        <li>{`Ts Rating: ${player.tsRating}`}</li>
        <li>{`Wins: ${player.wins}`}</li>
      </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object
};

export default Player;
