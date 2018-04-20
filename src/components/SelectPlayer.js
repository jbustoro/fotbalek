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
        {players
          .valueSeq()
          .map((player, key) => <option key={key}>{player.name}</option>)}
      </select>
    );
  }
}

SelectPlayer.propTypes = {
  players: PropTypes.object,
  onChange: PropTypes.func
};

export default connect(mapStateToProps)(SelectPlayer);
