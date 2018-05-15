import {
  LOADING_DATA,
  LOADED_DATA,
  LOAD_MATCHES_DATA,
  LOAD_PLAYERS_DATA,
  LOAD_TOURNAMENTS_DATA,
  LOAD_TEAMS_DATA,
  LOAD_SNAPSHOTS_DATA
} from '../constants'

export function loadingData() {
  return {
    type: LOADING_DATA
  }
}

export function loadedData() {
  return {
    type: LOADED_DATA
  }
}

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

export function loadSnapshotsData(payload) {
  return {
    type: LOAD_SNAPSHOTS_DATA,
    payload
  }
}
