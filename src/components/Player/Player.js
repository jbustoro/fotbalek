import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NORM_VALUE } from '../../constants'
import './Player.css'

class Player extends Component {
  render() {
    const { player } = this.props

    return (
      <tr>
        <td>{isNaN(player.order) ? '-' : player.order + 1}</td>
        <td>{player.name}</td>
        <td>{Math.floor((player.rating + NORM_VALUE) * 100)}</td>
        <td>{`${player.wins}:${player.loses}`}</td>
        <td>
          {player.goalsFor === 0 && player.goalsAgainst === 0
            ? (0).toFixed(2)
            : (player.goalsFor / player.goalsAgainst).toFixed(2)}
        </td>
      </tr>
    )
  }
}

Player.propTypes = {
  player: PropTypes.object
}

export default Player
