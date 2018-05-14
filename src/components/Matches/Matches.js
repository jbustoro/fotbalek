import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import PropTypes from 'prop-types'
import {
  matchesSelector,
  playersSelector,
  currentTournamentSelector
} from '../../selectors'
import { openModal } from '../../actions/newMatch'
import Loading from '../Loading/Loading'
import Match from '../Match/Match'
import NewMatch from '../NewMatch/NewMatch'
import { getMatchesSortedByDate, getMatchesToMap } from './matchesHelpers'
import './Matches.css'

const mapStateToProps = state => ({
  matches: matchesSelector(state.load),
  players: playersSelector(state.load),
  currentTournament: currentTournamentSelector(state.display)
})

const mapDispatchToProps = {
  openModal
}

class Matches extends Component {
  handleClick() {
    this.props.openModal()
  }

  render() {
    const { matches, players, currentTournament } = this.props
    const matchesToMap = getMatchesToMap(
      getMatchesSortedByDate(matches),
      currentTournament
    )

    return matchesToMap.size < 1 ? (
      <div>
        <Loading />
        <button className="Add-Match" onClick={() => this.handleClick()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <NewMatch />
      </div>
    ) : (
      <div className="Matches">
        {matchesToMap.valueSeq().map((match, key) => {
          const {
            playedAt,
            result,
            teams: {
              0: { 0: playerA0, 1: playerA1 },
              1: { 0: playerB0, 1: playerB1 }
            },
            tournamentId,
            gains
          } = match

          let playerData = player => ({
            ...players.get(player)
          })

          if (gains) {
            playerData = player => ({
              ...players.get(player),
              gain: gains[player]
            })
          }

          return (
            <Match
              key={key}
              playedAt={playedAt}
              result={result}
              playerA0={playerData(playerA0)}
              playerA1={playerData(playerA1)}
              playerB0={playerData(playerB0)}
              playerB1={playerData(playerB1)}
              tournamentId={tournamentId}
            />
          )
        })}
        <Button className="Add-Match" onClick={() => this.handleClick()}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <NewMatch />
      </div>
    )
  }
}

Matches.propTypes = {
  matches: PropTypes.object,
  players: PropTypes.object,
  openModal: PropTypes.func,
  currentTournament: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
