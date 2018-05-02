import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  currentTournamentSelector,
  teamsSelector,
  playersSelector
} from '../selectors';

const mapStateToProps = state => ({
  currentTournament: currentTournamentSelector(state),
  teams: teamsSelector(state),
  players: playersSelector(state)
});

class CurrentTournamentLeaderboard extends Component {
  render() {
    const { currentTournament, teams, players } = this.props;
    const currentTournamentTeams = _.filter(teams, {
      tournamentId: currentTournament
    });
    //TODO order the teams

    return (
      <div className="Current-tournament-leaderboard">
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
            {_.map(currentTournamentTeams, (team, key) => {
              const {
                goalsAgainst,
                goalsFor,
                wins,
                loses,
                players: [player0, player1]
              } = team;

              return (
                <tr key={key}>
                  <td>-</td>
                  <td>
                    {players.get(player0).name}
                    <br />
                    {players.get(player1).name}
                  </td>
                  <td>{`${wins}:${loses}`}</td>
                  <td>{(goalsFor / goalsAgainst).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

CurrentTournamentLeaderboard.propTypes = {
  currentTournament: PropTypes.string,
  teams: PropTypes.object,
  players: PropTypes.object
};

export default connect(mapStateToProps)(CurrentTournamentLeaderboard);
