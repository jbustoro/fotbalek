import { Record } from 'immutable'
import {
  SET_NAV_ACTIVE_KEY,
  DEFAULT_NAV_ACTIVE_KEY,
  SET_CURRENT_TOURNAMENT,
  DISPLAY_DATA,
  MATCHES,
  TOURNAMENTS,
  CURRENT_TOURNAMENT_LEADERBOARD
} from '../constants'

const initialState = Record({
  navActiveKey: DEFAULT_NAV_ACTIVE_KEY,
  currentItem: MATCHES,
  currentTournament: null
})

const defaultState = new initialState()

export default function display(state = defaultState, action) {
  /*eslint-disable indent*/
  switch (action.type) {
    case SET_NAV_ACTIVE_KEY:
      return state.set(`navActiveKey`, action.payload)
    case SET_CURRENT_TOURNAMENT: {
      const currentItem = action.payload
        ? CURRENT_TOURNAMENT_LEADERBOARD
        : TOURNAMENTS

      return state
        .set(`currentTournament`, action.payload)
        .set(`currentItem`, currentItem)
    }
    case DISPLAY_DATA:
      return state.set(`currentItem`, action.payload)
    default:
      return state
  }
  /*eslint-enable indent*/
}
