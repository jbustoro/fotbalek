import { Record, Map } from 'immutable'
import {
  LOADING_DATA,
  LOADED_DATA,
  LOAD_MATCHES_DATA,
  LOAD_PLAYERS_DATA,
  LOAD_TOURNAMENTS_DATA,
  LOAD_TEAMS_DATA,
  LOAD_SNAPSHOTS_DATA
} from '../constants'

const initialState = Record({
  isLoading: false,
  matches: Map({}),
  players: Map({}),
  tournaments: Map({}),
  teams: Map({}),
  snapshots: {}
})

const defaultState = new initialState()

export default function load(state = defaultState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return state.set(`isLoading`, true)
    case LOADED_DATA:
      return state.set(`isLoading`, false)
    case LOAD_MATCHES_DATA:
      return state.set(`matches`, Map(action.payload))
    case LOAD_PLAYERS_DATA:
      return state.set(`players`, Map(action.payload))
    case LOAD_TOURNAMENTS_DATA:
      return state.set(`tournaments`, Map(action.payload))
    case LOAD_TEAMS_DATA:
      return state.set(`teams`, Map(action.payload))
    case LOAD_SNAPSHOTS_DATA:
      return state.set(`snapshots`, action.payload)
    default:
      return state
  }
}
