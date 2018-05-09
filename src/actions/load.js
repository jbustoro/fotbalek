import {
  LOAD_MATCHES_DATA,
  LOAD_PLAYERS_DATA,
  LOAD_TOURNAMENTS_DATA,
  LOAD_TEAMS_DATA
} from '../constants'

export function loadMatchesData(payload) {
  return {
    type: LOAD_MATCHES_DATA,
    payload
  }
}

export function loadPlayersData(payload) {
  return {
    type: LOAD_PLAYERS_DATA,
    payload
  }
}

export function loadTournamentsData(payload) {
  return {
    type: LOAD_TOURNAMENTS_DATA,
    payload
  }
}

export function loadTeamsData(payload) {
  return {
    type: LOAD_TEAMS_DATA,
    payload
  }
}