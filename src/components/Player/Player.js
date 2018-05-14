import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  getPlayerOrder,
  getPlayerRatingDom,
  getPlayerDiff
} from './playerHelpers'
import { getPlayerGFGA } from '../utils/commonHelpers'
import './Player.css'

class Player extends Component {
  render() {
    const { player, snapshotRating } = this.props

    return (
      <tr>
        <td>{getPlayerOrder(player.order)}</td>
        <td>{player.name}</td>
        <td>{getPlayerRatingDom(snapshotRating, player.rating)}</td>
        <td>{`${player.wins}:${player.loses}`}</td>
        <td>{getPlayerGFGA(player.goalsFor, player.goalsAgainst)}</td>
        <td>{getPlayerDiff(snapshotRating)}</td>
      </tr>
    )
  }
}

Player.propTypes = {
  player: PropTypes.object,
  snapshotRating: PropTypes.number
}

export default Player
