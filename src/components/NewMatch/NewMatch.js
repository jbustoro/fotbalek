import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { PLAYERS } from '../../constants'
import { modalOpenSelector, newMatchSelector } from '../../selectors'
import { closeModal, setNewMatch, addNewMatch } from '../../actions/newMatch'
import Select from '../Select/Select'
import { validateNewMatch } from './newMatchHelpers'
import './NewMatch.css'

const TEAM_A = `TEAM_A`
const TEAM_B = `TEAM_B`
const PLAYER_0 = `PLAYER_0`
const PLAYER_1 = `PLAYER_1`
const SCORE = `SCORE`
const TOURNAMENT = `TOURNAMENT`

const mapStateToProps = state => ({
  modalOpen: modalOpenSelector(state.newMatch),
  newMatch: newMatchSelector(state.newMatch)
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
    validateNewMatch(newMatch, this.props.addNewMatch, this.props.closeModal)
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
              <Select
                dataType={PLAYERS}
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
              <Select
                dataType={PLAYERS}
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
              <Select
                dataType={PLAYERS}
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
              <Select
                dataType={PLAYERS}
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
              <Select
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
            </Button>
            {` `}
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
