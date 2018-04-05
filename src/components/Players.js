import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

class Players extends Component {
  render() {
    const { players } = this.props;

    return (
      <div className="Players">
        <h3>Players</h3>
        {players.map((player, key) => <Player key={key} player={player} />)}
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.array
};

export default Players;
