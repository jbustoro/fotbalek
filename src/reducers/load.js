import { Record, Map } from 'immutable'
import {
  LOAD_MATCHES_DATA,
  LOAD_PLAYERS_DATA,
  LOAD_TOURNAMENTS_DATA,
  LOAD_TEAMS_DATA
} from '../constants'

const initialState = Record({
  matches: {},
  players: Map({}),
  tournaments: {},
  teams: Map({})
})

const defaultState = new initialState()

export default function load(state = defaultState, action) {
  switch (action.type) {
    case LOAD_MATCHES_DATA:
      return state.set('matches', action.payload)
    case LOAD_PLAYERS_DATA:
      return state.set('players', Map(action.payload))
    case LOAD_TOURNAMENTS_DATA:
      return state.set('tournaments', action.payload)
    case LOAD_TEAMS_DATA:
      return state.set('teams', Map(action.payload))
    default:
      return state
  }
}
