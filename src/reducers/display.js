import { Record } from 'immutable'
import {
  SET_NAV_ACTIVE_KEY,
  SET_CURRENT_TOURNAMENT,
  DISPLAY_DATA,
  MATCHES,
  CURRENT_TOURNAMENT_LEADERBOARD
} from '../constants'

const initialState = Record({
  navActiveKey: 1,
  currentItem: MATCHES,
  currentTournament: null
})

const defaultState = new initialState()

export default function display(state = defaultState, action) {
  /*eslint-disable indent*/
  switch (action.type) {
    case SET_NAV_ACTIVE_KEY:
      return state.set(`navActiveKey`, action.payload)
    case SET_CURRENT_TOURNAMENT:
      return action.payload
        ? state
            .set(`currentTournament`, action.payload)
            .set(`currentItem`, CURRENT_TOURNAMENT_LEADERBOARD)
        : state
            .set(`currentTournament`, action.payload)
            .set(`currentItem`, MATCHES)
    case DISPLAY_DATA:
      return state.set(`currentItem`, action.payload)
    default:
      return state
  }
  /*eslint-enable indent*/
}
