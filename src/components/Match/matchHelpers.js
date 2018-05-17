import React from 'react'
import { ARROW_UP, ARROW_DOWN, PLUS_SIGN } from '../../constants'

const MATCH_GAIN_WIN = `Match-gain-win`
const MATCH_GAIN_LOSS = `Match-gain-loss`

export function getMatchGainDom(player) {
  let icon, plusSign, className

  if (!player.gain) {
    return null
  } else if (player.gain > 0) {
    icon = ARROW_UP
    className = MATCH_GAIN_WIN
    plusSign = PLUS_SIGN
  } else if (player.gain < 0) {
    icon = ARROW_DOWN
    className = MATCH_GAIN_LOSS
  }

  return (
    <div>
      <span className={className}>{icon}</span>
      {` `}
      {plusSign && plusSign}
      {Math.floor(player.gain * 100)}
    </div>
  )
}
