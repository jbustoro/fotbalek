import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { PLAYERS } from '../../constants'
import { playersSelector, tournamentsSelector } from '../../selectors'
import { getFormatedDate } from '../utils/commonHelpers'

const mapStateToProps = state => ({
  players: playersSelector(state),
  tournaments: tournamentsSelector(state)
})

class SelectPlayer extends Component {
  render() {
    const { dataType, players, tournaments, onChange } = this.props

    return dataType === PLAYERS ? (
      <FormControl componentClass="select" onChange={onChange}>
        <option selected disabled>
          Select Player
        </option>
        {players.entrySeq().map((playerData, key) => {
          const [playerId, player] = playerData

          return (
            <option key={key} value={playerId}>
              {player.name}
            </option>
          )
        })}
      </FormControl>
    ) : (
      <FormControl componentClass="select" onChange={onChange}>
        <option selected disabled>
          Select a tournament
        </option>
        {tournaments.entrySeq().map((tournamentData, key) => {
          const [tournamentId, tournament] = tournamentData

          return (
            <option key={key} value={tournamentId}>
              {getFormatedDate(tournament.createdAt)}
            </option>
          )
        })}
      </FormControl>
    )
  }
}

SelectPlayer.propTypes = {
  dataType: PropTypes.string,
  players: PropTypes.object,
  tournaments: PropTypes.object,
  onChange: PropTypes.func
}

export default connect(mapStateToProps)(SelectPlayer)
