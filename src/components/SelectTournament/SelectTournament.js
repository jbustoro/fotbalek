import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import { FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { tournamentsSelector } from '../../selectors'

const mapStateToProps = state => ({
  tournaments: tournamentsSelector(state.load)
})

class SelectTournament extends Component {
  render() {
    const { tournaments, onChange } = this.props

    return (
      <FormControl componentClass="select" onChange={onChange}>
        <option selected disabled>
          Select a tournament
        </option>
        {tournaments.entrySeq().map((tournamentData, key) => {
          const [tournamentId, tournament] = tournamentData

          return (
            <option key={key} value={tournamentId}>
              {dateFormat(
                tournament.createdAt,
                `dddd, mmmm dS, yyyy, h:MM:ss TT`
              )}
            </option>
          )
        })}
      </FormControl>
    )
  }
}

SelectTournament.propTypes = {
  tournaments: PropTypes.object,
  currentTournament: PropTypes.string,
  onChange: PropTypes.func
}

export default connect(mapStateToProps)(SelectTournament)
