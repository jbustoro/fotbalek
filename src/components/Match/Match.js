import React, { Component } from 'react'
import dateFormat from 'dateformat'
import { ARROW_UP, ARROW_DOWN } from '../../constants'
import PropTypes from 'prop-types'
import './Match.css'

const matchGain = player => {
  let icon, className

  if (player.gain > 0) {
    icon = ARROW_UP
    className = 'Match-gain-win'
  } else if (player.gain < 0) {
    icon = ARROW_DOWN
    className = 'Match-gain-loss'
  }

  return (
    <div>
      <span className={className}>{icon}</span>{' '}
      {` ${Math.floor(player.gain * 100)}`}
    </div>
  )
}

class Match extends Component {
  render() {
    const {
      playedAt,
      result: [resultA, resultB],
      playerA0,
      playerA1,
      playerB0,
      playerB1,
      tournamentId
    } = this.props

    return (
      <div className="Match">
        <div className="Match-date">
          <p>{dateFormat(playedAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</p>
        </div>
        <div className="Match-team">
          <p className="Match-player">{playerA0.name}</p>
          <div className="Match-gain">{matchGain(playerA0)}</div>
          <p className="Match-player">{playerA1.name}</p>
          <div className="Match-gain">{matchGain(playerA1)}</div>
        </div>
        <p className="Match-result">{`${resultA} - ${resultB}`}</p>
        <div className="Match-team">
          <p className="Match-player">{playerB0.name}</p>
          <div className="Match-gain">{matchGain(playerB0)}</div>
          <p className="Match-player">{playerB1.name}</p>
          <div className="Match-gain">{matchGain(playerB1)}</div>
        </div>
        {tournamentId && (
          <p className="Match-tournament">{`Tournament ID: ${tournamentId}`}</p>
        )}
      </div>
    )
  }
}

Match.propTypes = {
  playedAt: PropTypes.string,
  result: PropTypes.array,
  playerA0: PropTypes.object,
  playerA1: PropTypes.object,
  playerB0: PropTypes.object,
  playerB1: PropTypes.object,
  tournamentId: PropTypes.string,
  matchGain: PropTypes.func
}

export default Match
