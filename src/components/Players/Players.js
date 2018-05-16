import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import {
  isLoadingSelector,
  playersSelector,
  snapshotsSelector
} from '../../selectors'
import Loading from '../Loading/Loading'
import Player from '../Player/Player'
import {
  getPlayersSortedByRating,
  getLastSnapshot,
  getSnapshotRating
} from './playersHelpers'
import './Players.css'

const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state),
  players: playersSelector(state),
  snapshots: snapshotsSelector(state)
})

class Players extends Component {
  render() {
    const { isLoading, players, snapshots } = this.props
    const orderedPlayers = getPlayersSortedByRating(players)
    const lastSnapshot = getLastSnapshot(snapshots)

    return isLoading ? (
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
            {orderedPlayers.entrySeq().map(([playerId, player], key) => {
              return (
                <Player
                  key={key}
                  order={key}
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
  isLoading: PropTypes.bool,
  players: PropTypes.object,
  snapshots: PropTypes.object
}

export default connect(mapStateToProps)(Players)
