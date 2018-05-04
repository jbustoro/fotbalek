import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { playersSelector } from '../../selectors'

const mapStateToProps = state => ({
  players: playersSelector(state)
})

class SelectPlayer extends Component {
  render() {
    const { players, onChange } = this.props

    return (
      <FormControl componentClass="select" onChange={onChange}>
        <option>Select Player</option>
        {players.entrySeq().map((playerData, key) => {
          const [playerId, player] = playerData

          return (
            <option key={key} value={playerId}>
              {player.name}
            </option>
          )
        })}
      </FormControl>
    )
  }
}

SelectPlayer.propTypes = {
  players: PropTypes.object,
  onChange: PropTypes.func
}

export default connect(mapStateToProps)(SelectPlayer)
