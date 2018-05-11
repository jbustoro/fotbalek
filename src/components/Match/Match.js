import React, { Component } from 'react'
import dateFormat from 'dateformat'
import PropTypes from 'prop-types'
import { getMatchGainDom } from './matchHelpers.js'
import './Match.css'

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
          {dateFormat(playedAt, `dddd, mmmm dS, yyyy, h:MM:ss TT`)}
        </div>
        <div className="Match-team">
          <p className="Match-player">{playerA0.name}</p>
          <div className="Match-gain">{getMatchGainDom(playerA0)}</div>
          <p className="Match-player">{playerA1.name}</p>
          <div className="Match-gain">{getMatchGainDom(playerA1)}</div>
        </div>
        <p className="Match-result">{`${resultA} - ${resultB}`}</p>
        <div className="Match-team">
          <p className="Match-player">{playerB0.name}</p>
          <div className="Match-gain">{getMatchGainDom(playerB0)}</div>
          <p className="Match-player">{playerB1.name}</p>
          <div className="Match-gain">{getMatchGainDom(playerB1)}</div>
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
