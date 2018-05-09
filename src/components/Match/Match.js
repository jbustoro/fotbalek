import React, { Component } from 'react'
import dateFormat from 'dateformat'
import PropTypes from 'prop-types'
import { setMatchGain } from './matchHelper'
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
          <p>{dateFormat(playedAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</p>
        </div>
        <div className="Match-team">
          <p className="Match-player">{playerA0.name}</p>
          <div className="Match-gain">{setMatchGain(playerA0)}</div>
          <p className="Match-player">{playerA1.name}</p>
          <div className="Match-gain">{setMatchGain(playerA1)}</div>
        </div>
        <p className="Match-result">{`${resultA} - ${resultB}`}</p>
        <div className="Match-team">
          <p className="Match-player">{playerB0.name}</p>
          <div className="Match-gain">{setMatchGain(playerB0)}</div>
          <p className="Match-player">{playerB1.name}</p>
          <div className="Match-gain">{setMatchGain(playerB1)}</div>
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
  setMatchGain: PropTypes.func
}

export default Match
