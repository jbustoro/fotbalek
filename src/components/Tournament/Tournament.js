import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setNavActiveKey, setCurrentTournament } from '../../actions/display'
import { getFormatedDate } from '../utils/commonHelpers'
import { getTournamentActive } from './tournamentHelpers'
import './Tournament.css'

const mapDispatchToProps = {
  setNavActiveKey,
  setCurrentTournament
}

class Tournament extends Component {
  handleClick(tournamentId) {
    this.props.setNavActiveKey(1)
    this.props.setCurrentTournament(tournamentId)
  }

  render() {
    const { tournamentId, tournament } = this.props

    return (
      <div
        className="Tournament"
        onClick={() => this.handleClick(tournamentId)}
      >
        <p className="Tournament-date">
          {getFormatedDate(tournament.createdAt)}
        </p>
        <p className="Tournament-active">
          {getTournamentActive(tournament.active)}
        </p>
      </div>
    )
  }
}

Tournament.propTypes = {
  setNavActiveKey: PropTypes.func,
  setCurrentTournament: PropTypes.func,
  tournamentId: PropTypes.string,
  tournament: PropTypes.object
}

export default connect(null, mapDispatchToProps)(Tournament)
