import * as constants from '../constants';

export function loadMatchesData(payload) {
  return {
    type: constants.LOAD_MATCHES_DATA,
    payload
  };
}

export function loadPlayersData(payload) {
  return {
    type: constants.LOAD_PLAYERS_DATA,
    payload
  };
}

export function loadTournamentsData(payload) {
  return {
    type: constants.LOAD_TOURNAMENTS_DATA,
    payload
  };
}

export function displayMatches() {
  return { type: constants.DISPLAY_MATCHES };
}

export function displayPlayers() {
  return { type: constants.DISPLAY_PLAYERS };
}

export function displayTournaments() {
  return { type: constants.DISPLAY_TOURNAMENTS };
}
