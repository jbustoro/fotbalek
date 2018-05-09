import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { tournamentsSelector } from '../../selectors'
import Loading from '../Loading/Loading'
import Tournament from '../Tournament/Tournament'
import './Tournaments.css'

const mapStateToProps = state => ({
  tournaments: tournamentsSelector(state.load)
})

class Tournaments extends Component {
  render() {
    const { tournaments } = this.props

    return _.isEmpty(tournaments) ? (
      <Loading />
    ) : (
      <div className="Tournaments">
        <h3 className="Tournaments-title">Tournaments</h3>
        {_.map(tournaments, (tournament, key) => (
          <Tournament key={key} tournamentId={key} tournament={tournament} />
        ))}
      </div>
    )
  }
}

Tournaments.propTypes = {
  tournaments: PropTypes.object
}

export default connect(mapStateToProps)(Tournaments)
