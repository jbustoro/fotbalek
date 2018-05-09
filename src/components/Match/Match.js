import React, { Component } from 'react'
import dateFormat from 'dateformat'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp'
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown'
import PropTypes from 'prop-types'
import './Match.css'

const setMatchGain = player => (
  <div>
    <FontAwesomeIcon
      icon={player.gain > 0 ? faArrowUp : faArrowDown}
      style={player.gain > 0 ? { color: '#2ECC40' } : { color: '#FF4136' }}
    />
    {` ${Math.floor(player.gain * 100)}`}
  </div>
)

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
