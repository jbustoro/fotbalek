import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import { matchesSelector, playersSelector } from '../selectors';
import { openModal } from '../actions';
import { settingNewMatch } from '../actions/newMatch';
import Match from './Match';
import Loading from './Loading';
import NewMatch from './NewMatch';
import './Matches.css';

const mapStateToProps = state => ({
  matches: matchesSelector(state),
  players: playersSelector(state)
});

const mapDispatchToProps = {
  openModal,
  settingNewMatch
};

class Matches extends Component {
  handleClick() {
    this.props.openModal();
    this.props.settingNewMatch();
  }
  render() {
    const { matches, players } = this.props;

    return _.isEmpty(matches) ? (
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
        {_.map(matches, (match, key) => {
          const {
            playedAt,
            result,
            teams: {
              0: { 0: playerA0, 1: playerA1 },
              1: { 0: playerB0, 1: playerB1 }
            },
            tournamentId
          } = match;

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
        <button className="Add-Match" onClick={() => this.handleClick()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <NewMatch />
      </div>
    );
  }
}

Matches.propTypes = {
  matches: PropTypes.object,
  players: PropTypes.object,
  openModal: PropTypes.func,
  settingNewMatch: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
