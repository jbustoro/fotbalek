import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp'
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown'

export const setMatchGain = player => (
  <div>
    <FontAwesomeIcon
      icon={player.gain > 0 ? faArrowUp : faArrowDown}
      style={player.gain > 0 ? { color: '#2ECC40' } : { color: '#FF4136' }}
    />
    {` ${Math.floor(player.gain * 100)}`}
  </div>
)
