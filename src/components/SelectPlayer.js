import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playersSelector } from '../selectors';

const mapStateToProps = state => ({
  players: playersSelector(state)
});

class SelectPlayer extends Component {
  render() {
    const { players, onChange } = this.props;

    return (
      <select onChange={onChange}>
        <option>Select a player</option>
        {players.entrySeq().map((playerData, key) => {
          const [playerId, player] = playerData;

          return (
            <option key={key} value={playerId}>
              {player.name}
            </option>
          );
        })}
      </select>
    );
  }
}

SelectPlayer.propTypes = {
  players: PropTypes.object,
  onChange: PropTypes.func
};

export default connect(mapStateToProps)(SelectPlayer);
