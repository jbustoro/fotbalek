import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import dateFormat from 'dateformat'
import { FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { tournamentsSelector, currentTournamentSelector } from '../../selectors'

const mapStateToProps = state => ({
  tournaments: tournamentsSelector(state.load),
  currentTournament: currentTournamentSelector(state.display)
})

class SelectTournament extends Component {
  render() {
    const { tournaments, currentTournament, onChange } = this.props

    return (
      <FormControl componentClass="select" onChange={onChange}>
        <option>Select a tournament</option>
        {_.map(tournaments, (tournament, key) => {
          const selected = currentTournament === key ? true : false

          return (
            <option key={key} value={key} selected={selected}>
              {dateFormat(
                tournament.createdAt,
                'dddd, mmmm dS, yyyy, h:MM:ss TT'
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
