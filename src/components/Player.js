import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Player.css';

class Player extends Component {
  render() {
    const { player } = this.props;

    return (
      <tr>
        <td>{player.order}</td>
        <td>{player.name}</td>
        <td>{player.rating.toFixed(2)}</td>
        <td>{`${player.wins}:${player.loses}`}</td>
        <td>{(player.goalsFor / player.goalsAgainst).toFixed(2)}</td>
      </tr>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object
};

export default Player;
