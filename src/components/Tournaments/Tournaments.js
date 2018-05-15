import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isLoadingSelector, tournamentsSelector } from '../../selectors'
import Loading from '../Loading/Loading'
import Tournament from '../Tournament/Tournament'
import { getTournamentsSortedByDate } from './tournamentsHelpers'
import './Tournaments.css'

const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state),
  tournaments: tournamentsSelector(state)
})

class Tournaments extends Component {
  render() {
    const { isLoading, tournaments } = this.props
    const orderedTournaments = getTournamentsSortedByDate(tournaments)

    return isLoading ? (
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
  isLoading: PropTypes.bool,
  tournaments: PropTypes.object
}

export default connect(mapStateToProps)(Tournaments)
