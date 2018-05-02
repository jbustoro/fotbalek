import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import PropTypes from 'prop-types';
import {
  matchesSelector,
  playersSelector,
  currentTournamentSelector
} from '../selectors';
import { openModal } from '../actions';
import Match from './Match';
import Loading from './Loading';
import NewMatch from './NewMatch';
import './Matches.css';

const mapStateToProps = state => ({
  matches: matchesSelector(state),
  players: playersSelector(state),
  currentTournament: currentTournamentSelector(state)
});

const mapDispatchToProps = {
  openModal
};

class Matches extends Component {
  handleClick() {
    this.props.openModal();
  }

  render() {
    const { matches, players, currentTournament } = this.props;

    const matchesToMap = !currentTournament
      ? matches
      : _.filter(matches, {
          tournamentId: currentTournament
        });

    return _.isEmpty(matchesToMap) ? (
      <div>
        <Loading />
        <button className="Add-Match" onClick={() => this.handleClick()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <NewMatch />
      </div>
    ) : (
      <div className="Matches">
        <h3 className="Matches-title">Matches</h3>
        {_.map(matchesToMap, (match, key) => {
          const {
            playedAt,
            result,
            teams: {
              0: { 0: playerA0, 1: playerA1 },
              1: { 0: playerB0, 1: playerB1 }
            },
            tournamentId,
            gains
          } = match;

          const playerData = player => ({
            ...players.get(player),
            gain: gains[player]
          });

          return (
            <Match
              key={key}
              playedAt={playedAt}
              result={result}
              playerA0={playerData(playerA0)}
              playerA1={playerData(playerA1)}
              playerB0={playerData(playerB0)}
              playerB1={playerData(playerB1)}
              tournamentId={tournamentId}
            />
          );
        })}
        <Button className="Add-Match" onClick={() => this.handleClick()}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <NewMatch />
      </div>
    );
  }
}

Matches.propTypes = {
  matches: PropTypes.object,
  players: PropTypes.object,
  openModal: PropTypes.func,
  currentTournament: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
