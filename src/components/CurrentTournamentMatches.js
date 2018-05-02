import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import PropTypes from 'prop-types';
import {
  currentTournamentSelector,
  matchesSelector,
  playersSelector
} from '../selectors';
import { openModal } from '../actions';
import Match from './Match';
import Loading from './Loading';
import NewMatch from './NewMatch';

const mapStateToProps = state => ({
  currentTournament: currentTournamentSelector(state),
  matches: matchesSelector(state),
  players: playersSelector(state)
});

const mapDispatchToProps = {
  openModal
};

class CurrentTournamentMatches extends Component {
  handleClick() {
    this.props.openModal();
  }

  render() {
    const { currentTournament, matches, players } = this.props;
    const currentTournamentMatches = _.filter(matches, {
      tournamentId: currentTournament
    });

    return _.isEmpty(currentTournamentMatches) ? (
      <div>
        <Loading />
        <button className="Add-Match" onClick={() => this.handleClick()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <NewMatch />
      </div>
    ) : (
      <div className="Current-tournament-leaderboard">
        {_.map(currentTournamentMatches, (match, key) => {
          const {
            playedAt,
            result,
            teams: {
              0: { 0: playerA0, 1: playerA1 },
              1: { 0: playerB0, 1: playerB1 }
            },
            tournamentId
          } = match;

          console.log(
            'can u do dis',
            'teamA',
            playerA0,
            playerA1,
            'teamB',
            playerB0,
            playerB1,
            result
          );

          return (
            <Match
              key={key}
              playedAt={playedAt}
              result={result}
              playerA0={players.get(playerA0)}
              playerA1={players.get(playerA1)}
              playerB0={players.get(playerB0)}
              playerB1={players.get(playerB1)}
              tournamentId={tournamentId}
            />
          );
        })}
        <Button className="Add-Match" onClick={() => this.handleClick()}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <NewMatch />
      </div>
      //TODO on new match add the currentTournamentId
    );
  }
}

CurrentTournamentMatches.propTypes = {
  currentTournament: PropTypes.string,
  matches: PropTypes.object,
  players: PropTypes.object,
  openModal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CurrentTournamentMatches
);
