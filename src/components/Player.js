import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Player.css';

class Player extends Component {
  render() {
    const { player } = this.props;
    const {
      deviceToken,
      goalsAgainst,
      goalsFor,
      loses,
      name,
      order,
      rating,
      sigma,
      tsRating,
      wins
    } = player;

    return (
      <div className="Player">
        <li>{`Device token: ${deviceToken}`}</li>
        <li>{`Goals against: ${goalsAgainst}`}</li>
        <li>{`Goals for: ${goalsFor}`}</li>
        <li>{`Loses: ${loses}`}</li>
        <li>{`Name: ${name}`}</li>
        <li>{`Order: ${order}`}</li>
        <li>{`Rating: ${rating}`}</li>
        <li>{`Sigma: ${sigma}`}</li>
        <li>{`Ts Rating: ${tsRating}`}</li>
        <li>{`Wins: ${wins}`}</li>
      </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object
};

export default Player;
