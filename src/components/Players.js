import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Player from './Player'
import { playersSelector } from '../selectors'
import Loading from './Loading'
import './Players.css'

const mapStateToProps = state => ({
  players: playersSelector(state)
})

class Players extends Component {
  render() {
    const { players } = this.props
    const orderedPlayers = players.sortBy(player => player.order)

    return _.isEmpty(players) ? (
      <Loading />
    ) : (
      <div className="Players">
        <h3 className="Players-title">Players</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Rating</th>
              <th>W:L</th>
              <th>Gf/Ga</th>
            </tr>
          </thead>
          <tbody>
            {orderedPlayers
              .valueSeq()
              .map((player, key) => <Player key={key} player={player} />)}
          </tbody>
        </Table>
      </div>
    )
  }
}

Players.propTypes = {
  players: PropTypes.object
}

export default connect(mapStateToProps)(Players)
