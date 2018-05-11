import React from 'react'
import { ARROW_UP, ARROW_DOWN, BLACK_CIRCLE } from '../../constants'

const PLAYER_RATING_WIN = `Player-rating-win`
const PLAYER_RATING_LOSS = `Player-rating-loss`
const PLAYER_RATING_EQUAL = `Player-rating-equal`
const NORM_VALUE = 10

function formatRating(rating) {
  return Math.floor(rating * 100)
}

export function getPlayerOrder(order) {
  return isNaN(order) ? `-` : order + 1
}

export function getPlayerRatingDom(snapshotRating, playerRatingData) {
  let icon, className

  if (snapshotRating > 0) {
    icon = ARROW_UP
    className = PLAYER_RATING_WIN
  } else if (snapshotRating < 0) {
    icon = ARROW_DOWN
    className = PLAYER_RATING_LOSS
  } else {
    icon = BLACK_CIRCLE
    className = PLAYER_RATING_EQUAL
  }

  return (
    <div className="Rating">
      <span className={className}>{icon}</span>
      {` `}
      {formatRating(playerRatingData + NORM_VALUE)}
    </div>
  )
}

export function getPlayerGFGA(goalsFor, goalsAgainst) {
  return goalsFor === 0 && goalsAgainst === 0
    ? (0).toFixed(2)
    : (goalsFor / goalsAgainst).toFixed(2)
}

export function getPlayerDiff(snapshotRating) {
  if (snapshotRating) {
    if (snapshotRating > 0) {
      return `+${formatRating(snapshotRating)}`
    } else if (snapshotRating < 0) {
      return formatRating(snapshotRating)
    }
  }
  return `0`
}
