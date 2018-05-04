import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'
import PropTypes from 'prop-types'
import {
  TEAM_A,
  TEAM_B,
  PLAYER_0,
  PLAYER_1,
  SCORE,
  TOURNAMENT
} from '../../constants'
import { modalOpenSelector, newMatchSelector } from '../../selectors'
import { closeModal } from '../../actions'
import { setNewMatch, addNewMatch } from '../../actions/newMatch'
import SelectPlayer from '../SelectPlayer/SelectPlayer'
import SelectTournament from '../SelectTournament/SelectTournament'
import './NewMatch.css'

const mapStateToProps = state => ({
  modalOpen: modalOpenSelector(state),
  newMatch: newMatchSelector(state)
})

const mapDispatchToProps = {
  closeModal,
  setNewMatch,
  addNewMatch
}

class NewMatch extends Component {
  handleSubmit(event) {
    event.preventDefault()

    const { newMatch } = this.props
    const { playerA0, playerA1, playerB0, playerB1, scoreA, scoreB } = newMatch

    if (
      ![playerA0, playerA1, playerB0, playerB1, scoreA, scoreB].every(
        value => value
      )
    ) {
      return swal('Oops!', 'Empty data!', 'warning')
    } else if (scoreA < 0 || scoreB < 0 || scoreA > 10 || scoreB > 10) {
      return swal('Oops!', 'Score must be between 0 - 10!', 'warning')
    }

    const players = [playerA0, playerA1, playerB0, playerB1]

    players.forEach((player, i) => {
      if (players.indexOf(player) !== i) {
        return swal('Oops!', 'Duplicate player!', 'warning')
      }
    })

    this.props.addNewMatch(this.props.newMatch)
    this.props.closeModal()

    return swal('Success', 'Match added!', 'success')
  }

  render() {
    return (
      <div className="New-match">
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
                  )
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
                pattern="[0-9]*"
                value={this.props.newMatch.scoreA}
                onChange={event => {
                  this.props.setNewMatch(
                    TEAM_A,
                    null,
                    null,
                    null,
                    SCORE,
                    null,
                    parseInt(event.target.value, 10)
                  )
                }}
              />
              {` : `}
              <input
                name="resultB"
                type="number"
                value={this.props.newMatch.scoreB}
                autoFocus
                onChange={event => {
                  this.props.setNewMatch(
                    null,
                    TEAM_B,
                    null,
                    null,
                    SCORE,
                    null,
                    parseInt(event.target.value, 10)
                  )
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
            <Button bsStyle="primary" type="submit">
              Save
            </Button>{' '}
            <Button onClick={() => this.props.closeModal()}>Cancel</Button>
          </form>
        </Modal>
      </div>
    )
  }
}

NewMatch.propTypes = {
  modalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  alertShow: PropTypes.bool,
  showAlert: PropTypes.func,
  hideAlert: PropTypes.func,
  newMatch: PropTypes.object,
  setNewMatch: PropTypes.func,
  addNewMatch: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMatch)
