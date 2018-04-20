import {
  LOAD_MATCHES_DATA,
  LOAD_PLAYERS_DATA,
  LOAD_TOURNAMENTS_DATA,
  DISPLAY_MATCHES,
  DISPLAY_PLAYERS,
  DISPLAY_TOURNAMENTS,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../constants';

export function loadMatchesData(payload) {
  return {
    type: LOAD_MATCHES_DATA,
    payload
  };
}

export function loadPlayersData(payload) {
  return {
    type: LOAD_PLAYERS_DATA,
    payload
  };
}

export function loadTournamentsData(payload) {
  return {
    type: LOAD_TOURNAMENTS_DATA,
    payload
  };
}

export function displayMatches() {
  return { type: DISPLAY_MATCHES };
}

export function displayPlayers() {
  return { type: DISPLAY_PLAYERS };
}

export function displayTournaments() {
  return { type: DISPLAY_TOURNAMENTS };
}

export function openModal() {
  return { type: OPEN_MODAL };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}
