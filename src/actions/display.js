import {
  SET_NAV_ACTIVE_KEY,
  SET_CURRENT_TOURNAMENT,
  DISPLAY_DATA
} from '../constants'

export function setNavActiveKey(payload) {
  return {
    type: SET_NAV_ACTIVE_KEY,
    payload
  }
}

export function setCurrentTournament(payload) {
  return {
    type: SET_CURRENT_TOURNAMENT,
    payload
  }
}

export function displayData(payload) {
  return {
    type: DISPLAY_DATA,
    payload
  }
}
