import { Record } from 'immutable'
import {
  SET_NAV_ACTIVE_KEY,
  DISPLAY_PLAYERS,
  DISPLAY_MATCHES,
  DISPLAY_TOURNAMENTS,
  SET_CURRENT_TOURNAMENT,
  DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD,
  DISPLAY_CURRENT_TOURNAMENT_MATCHES
} from '../constants'

const initialState = Record({
  navActiveKey: 1,
  currentItem: DISPLAY_MATCHES,
  currentTournament: null
})

const defaultState = new initialState()

export default function display(state = defaultState, action) {
  /*eslint-disable indent*/
  switch (action.type) {
    case SET_NAV_ACTIVE_KEY:
      return state.set(`navActiveKey`, action.payload)
    case DISPLAY_MATCHES:
      return state.set(`currentItem`, DISPLAY_MATCHES)
    case DISPLAY_PLAYERS:
      return state.set(`currentItem`, DISPLAY_PLAYERS)
    case DISPLAY_TOURNAMENTS:
      return state.set(`currentItem`, DISPLAY_TOURNAMENTS)
    case SET_CURRENT_TOURNAMENT:
      return action.payload
        ? state
            .set(`currentTournament`, action.payload)
            .set(`currentItem`, DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD)
        : state
            .set(`currentTournament`, action.payload)
            .set(`currentItem`, DISPLAY_MATCHES)
    case DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD:
      return state.set(`currentItem`, DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD)
    case DISPLAY_CURRENT_TOURNAMENT_MATCHES:
      return state.set(`currentItem`, DISPLAY_CURRENT_TOURNAMENT_MATCHES)
    default:
      return state
  }
  /*eslint-enable indent*/
}
