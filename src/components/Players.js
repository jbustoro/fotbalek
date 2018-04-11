import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Player from './Player';
import { playersSelector } from '../selectors';

const mapStateToProps = state => ({
  players: playersSelector(state)
});

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

export default connect(mapStateToProps)(Players);
