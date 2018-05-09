import {
  SET_NAV_ACTIVE_KEY,
  DISPLAY_MATCHES,
  DISPLAY_PLAYERS,
  DISPLAY_TOURNAMENTS,
  SET_CURRENT_TOURNAMENT,
  DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD,
  DISPLAY_CURRENT_TOURNAMENT_MATCHES
} from '../constants'

export function setNavActiveKey(payload) {
  return {
    type: SET_NAV_ACTIVE_KEY,
    payload
  }
}

export function displayMatches() {
  return { type: DISPLAY_MATCHES }
}

export function displayPlayers() {
  return { type: DISPLAY_PLAYERS }
}

export function displayTournaments() {
  return { type: DISPLAY_TOURNAMENTS }
}

export function setCurrentTournament(payload) {
  return {
    type: SET_CURRENT_TOURNAMENT,
    payload
  }
}

export function displayCurrentTournamentLeaderboard() {
  return {
    type: DISPLAY_CURRENT_TOURNAMENT_LEADERBOARD
  }
}

export function displayCurrentTournamentMatches() {
  return {
    type: DISPLAY_CURRENT_TOURNAMENT_MATCHES
  }
}
