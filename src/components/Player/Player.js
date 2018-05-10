import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ARROW_UP, ARROW_DOWN, BLACK_CIRCLE, NORM_VALUE } from '../../constants'
import './Player.css'

const playerRating = (snapshotRating, playerRatingData) => {
  let icon, className

  if (snapshotRating > 0) {
    icon = ARROW_UP
    className = 'Player-rating-win'
  } else if (snapshotRating < 0) {
    icon = ARROW_DOWN
    className = 'Player-rating-loss'
  } else {
    icon = BLACK_CIRCLE
    className = 'Player-rating-equal'
  }

  return (
    <div className="Rating">
      <span className={className}>{icon}</span>{' '}
      {Math.floor((playerRatingData + NORM_VALUE) * 100)}
    </div>
  )
}

const diff = snapshotRating => {
  if (snapshotRating) {
    if (snapshotRating > 0) {
      return `+${snapshotRating.toFixed(2)}`
    } else if (snapshotRating < 0) {
      return snapshotRating.toFixed(2)
    }
  }
  return '0'
}

class Player extends Component {
  render() {
    const { player, snapshotRating } = this.props

    return (
      <tr>
        <td>{isNaN(player.order) ? '-' : player.order + 1}</td>
        <td>{player.name}</td>
        <td>{playerRating(snapshotRating, player.rating)}</td>
        <td>{`${player.wins}:${player.loses}`}</td>
        <td>
          {player.goalsFor === 0 && player.goalsAgainst === 0
            ? (0).toFixed(2)
            : (player.goalsFor / player.goalsAgainst).toFixed(2)}
        </td>
        <td>{diff(snapshotRating)}</td>
      </tr>
    )
  }
}

Player.propTypes = {
  player: PropTypes.object,
  snapshotRating: PropTypes.number
}

export default Player
