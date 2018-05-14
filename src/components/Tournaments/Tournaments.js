import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { tournamentsSelector } from '../../selectors'
import Loading from '../Loading/Loading'
import Tournament from '../Tournament/Tournament'
import { getTournamentsSortedByDate } from './tournamentsHelpers'
import './Tournaments.css'

const mapStateToProps = state => ({
  tournaments: tournamentsSelector(state.load)
})

class Tournaments extends Component {
  render() {
    const { tournaments } = this.props
    const orderedTournaments = getTournamentsSortedByDate(tournaments)

    return orderedTournaments.size < 1 ? (
      <Loading />
    ) : (
      <div className="Tournaments">
        {orderedTournaments.entrySeq().map((tournamentData, key) => {
          const [tournamentId, tournament] = tournamentData

          return (
            <Tournament
              key={key}
              tournamentId={tournamentId}
              tournament={tournament}
            />
          )
        })}
      </div>
    )
  }
}

Tournaments.propTypes = {
  tournaments: PropTypes.object
}

export default connect(mapStateToProps)(Tournaments)
