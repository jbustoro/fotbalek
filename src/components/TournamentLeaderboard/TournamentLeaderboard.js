import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import {
  currentTournamentSelector,
  teamsSelector,
  playersSelector
} from '../../selectors'
import './TournamentLeaderboard.css'

const mapStateToProps = state => ({
  currentTournament: currentTournamentSelector(state.display),
  teams: teamsSelector(state.load),
  players: playersSelector(state.load)
})

class TournamentLeaderboard extends Component {
  render() {
    const { currentTournament, teams, players } = this.props
    const currentTournamentTeams = teams.filter(
      team => team.tournamentId === currentTournament
    )
    const orderedTeams = currentTournamentTeams
      .sortBy(team => team.wins)
      .reverse()

    return (
      <div className="Tournament-leaderboard">
        <Table striped bordered condensed>
          <thead>
            <tr>
              <th>#</th>
              <th>Players</th>
              <th>W:L</th>
              <th>Gf/Ga</th>
            </tr>
          </thead>
          <tbody>
            {orderedTeams.valueSeq().map((team, key) => {
              const {
                goalsAgainst,
                goalsFor,
                wins,
                loses,
                players: [player0, player1]
              } = team

              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {players.get(player0).name}
                    <br />
                    {players.get(player1).name}
                  </td>
                  <td>{`${wins}:${loses}`}</td>
                  <td>{(goalsFor / goalsAgainst).toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

TournamentLeaderboard.propTypes = {
  currentTournament: PropTypes.string,
  teams: PropTypes.object,
  players: PropTypes.object
}

export default connect(mapStateToProps)(TournamentLeaderboard)
