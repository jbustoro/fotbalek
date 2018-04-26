import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { modalOpenSelector, newMatchSelector } from '../selectors';
import { closeModal } from '../actions';
import SelectPlayer from './SelectPlayer';
import SelectTournament from './SelectTournament';
import { setNewMatch, addNewMatch } from '../actions/newMatch';
import './NewMatch.css';

import {
  TEAM_A,
  TEAM_B,
  PLAYER_0,
  PLAYER_1,
  SCORE,
  TOURNAMENT
} from '../constants';

const mapStateToProps = state => ({
  modalOpen: modalOpenSelector(state),
  newMatch: newMatchSelector(state)
});

const mapDispatchToProps = {
  closeModal,
  setNewMatch,
  addNewMatch
};

class NewMatch extends Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.addNewMatch(this.props.newMatch);
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
            <h3>Players</h3>
            <h4>Team 1</h4>
            <SelectPlayer
              onChange={event => {
                this.props.setNewMatch(
                  TEAM_A,
                  null,
                  PLAYER_0,
                  null,
                  null,
                  null,
                  event.target.value
                );
              }}
            />
            <SelectPlayer
              onChange={event =>
                this.props.setNewMatch(
                  TEAM_A,
                  null,
                  null,
                  PLAYER_1,
                  null,
                  null,
                  event.target.value
                )
              }
            />
            <h4>Team 2</h4>
            <SelectPlayer
              onChange={event =>
                this.props.setNewMatch(
                  null,
                  TEAM_B,
                  PLAYER_0,
                  null,
                  null,
                  null,
                  event.target.value
                )
              }
            />
            <SelectPlayer
              onChange={event =>
                this.props.setNewMatch(
                  null,
                  TEAM_B,
                  null,
                  PLAYER_1,
                  null,
                  null,
                  event.target.value
                )
              }
            />
          </div>
          <div className="New-match-score">
            <h3>Score</h3>
            <input
              name="resultA"
              type="number"
              value={this.props.newMatch.result.scoreA}
              onChange={event => {
                this.props.setNewMatch(
                  TEAM_A,
                  null,
                  null,
                  null,
                  SCORE,
                  null,
                  Number(event.target.value)
                );
              }}
            />
            {` : `}
            <input
              name="resultB"
              type="number"
              value={this.props.newMatch.result.scoreB}
              onChange={event => {
                this.props.setNewMatch(
                  null,
                  TEAM_B,
                  null,
                  null,
                  SCORE,
                  null,
                  Number(event.target.value)
                );
              }}
            />
          </div>
          <div className="New-match-tournament">
            <h3>Tournament</h3>
            <SelectTournament
              onChange={event =>
                this.props.setNewMatch(
                  null,
                  null,
                  null,
                  null,
                  null,
                  TOURNAMENT,
                  event.target.value
                )
              }
            />
          </div>
          <br />
          <Button
            bsStyle="success"
            type="submit"
            onClick={() => this.props.closeModal()}
          >
            Save
          </Button>{' '}
          <Button onClick={() => this.props.closeModal()}>Cancel</Button>
        </form>
      </Modal>
    );
  }
}

NewMatch.propTypes = {
  modalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  newMatch: PropTypes.object,
  setNewMatch: PropTypes.func,
  addNewMatch: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMatch);
