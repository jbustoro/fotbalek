import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import { modalOpenSelector, newMatchSelector } from '../selectors';
import { closeModal } from '../actions';
import SelectPlayer from './SelectPlayer';
import SelectTournament from './SelectTournament';
import {
  setNewMatchTeamAPlayer0,
  setNewMatchTeamAPlayer1,
  setNewMatchTeamBPlayer0,
  setNewMatchTeamBPlayer1,
  setNewMatchTeamAScore,
  setNewMatchTeamBScore,
  setNewMatchTournament,
  saveNewMatch
} from '../actions/newMatch';
import './NewMatch.css';

const mapStateToProps = state => ({
  modalOpen: modalOpenSelector(state),
  newMatch: newMatchSelector(state)
});

const mapDispatchToProps = {
  closeModal,
  setNewMatchTeamAPlayer0,
  setNewMatchTeamAPlayer1,
  setNewMatchTeamBPlayer0,
  setNewMatchTeamBPlayer1,
  setNewMatchTeamAScore,
  setNewMatchTeamBScore,
  setNewMatchTournament,
  saveNewMatch
};

class NewMatch extends Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.saveNewMatch();
  }

  render() {
    return (
      <Modal
        open={this.props.modalOpen}
        onClose={() => this.props.closeModal()}
        little
      >
        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="New-match-players">
            <h2>Players</h2>
            <h3>Team 1</h3>
            <SelectPlayer
              onChange={event => {
                this.props.setNewMatchTeamAPlayer0(event.target.value);
              }}
            />
            <SelectPlayer
              onChange={event =>
                this.props.setNewMatchTeamAPlayer1(event.target.value)
              }
            />
            <h3>Team 2</h3>
            <SelectPlayer
              onChange={event =>
                this.props.setNewMatchTeamBPlayer0(event.target.value)
              }
            />
            <SelectPlayer
              onChange={event =>
                this.props.setNewMatchTeamBPlayer1(event.target.value)
              }
            />
          </div>
          <div className="New-match-score">
            <h2>Score</h2>
            <input
              name="resultA"
              type="number"
              value={this.props.newMatch.result.scoreA}
              onChange={event => {
                this.props.setNewMatchTeamAScore(Number(event.target.value));
              }}
            />
            {` : `}
            <input
              name="resultB"
              type="number"
              value={this.props.newMatch.result.scoreB}
              onChange={event => {
                this.props.setNewMatchTeamBScore(Number(event.target.value));
              }}
            />
          </div>
          <div className="New-match-tournament">
            <h2>Tournament</h2>
            <SelectTournament
              onChange={event =>
                this.props.setNewMatchTournament(event.target.value)
              }
            />
          </div>
          <button type="submit">Save</button>
          <button
            className="destructive"
            onClick={() => this.props.closeModal()}
          >
            Cancel
          </button>
        </form>
      </Modal>
    );
  }
}

NewMatch.propTypes = {
  modalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  newMatch: PropTypes.object,
  setNewMatchTeamAPlayer0: PropTypes.func,
  setNewMatchTeamAPlayer1: PropTypes.func,
  setNewMatchTeamBPlayer0: PropTypes.func,
  setNewMatchTeamBPlayer1: PropTypes.func,
  setNewMatchTeamAScore: PropTypes.func,
  setNewMatchTeamBScore: PropTypes.func,
  setNewMatchTournament: PropTypes.func,
  saveNewMatch: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMatch);
