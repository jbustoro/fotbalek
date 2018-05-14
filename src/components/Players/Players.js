import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { playersSelector, snapshotsSelector } from '../../selectors'
import Loading from '../Loading/Loading'
import Player from '../Player/Player'
import {
  getPLayersSortedByOrder,
  getLastSnapshot,
  getSnapshotRating
} from './playersHelpers'
import './Players.css'

const mapStateToProps = state => ({
  players: playersSelector(state.load),
  snapshots: snapshotsSelector(state.load)
})

class Players extends Component {
  render() {
    const { players, snapshots } = this.props
    const orderedPlayers = getPLayersSortedByOrder(players)
    const lastSnapshot = getLastSnapshot(snapshots)

    return orderedPlayers.size < 1 ? (
      <Loading />
    ) : (
      <div className="Players">
        <Table striped bordered condensed>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Rating</th>
              <th>W:L</th>
              <th>Gf/Ga</th>
              <th>Diff</th>
            </tr>
          </thead>
          <tbody>
            {orderedPlayers.entrySeq().map((playerData, key) => {
              const [playerId, player] = playerData

              return (
                <Player
                  key={key}
                  player={player}
                  snapshotRating={getSnapshotRating(lastSnapshot, playerId)}
                />
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

Players.propTypes = {
  players: PropTypes.object,
  snapshots: PropTypes.object
}

export default connect(mapStateToProps)(Players)
