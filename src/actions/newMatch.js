import {
  SETTING_NEW_MATCH,
  SET_NEW_MATCH_TEAM_A_PLAYER_0,
  SET_NEW_MATCH_TEAM_A_PLAYER_1,
  SET_NEW_MATCH_TEAM_B_PLAYER_0,
  SET_NEW_MATCH_TEAM_B_PLAYER_1,
  SET_NEW_MATCH_TEAM_A_SCORE,
  SET_NEW_MATCH_TEAM_B_SCORE,
  SET_NEW_MATCH_TOURNAMENT,
  SAVE_NEW_MATCH
} from '../constants';

export function settingNewMatch() {
  return {
    type: SETTING_NEW_MATCH
  };
}

export function setNewMatchTeamAPlayer0(payload) {
  return {
    type: SET_NEW_MATCH_TEAM_A_PLAYER_0,
    payload
  };
}

export function setNewMatchTeamAPlayer1(payload) {
  return {
    type: SET_NEW_MATCH_TEAM_A_PLAYER_1,
    payload
  };
}

export function setNewMatchTeamBPlayer0(payload) {
  return {
    type: SET_NEW_MATCH_TEAM_B_PLAYER_0,
    payload
  };
}

export function setNewMatchTeamBPlayer1(payload) {
  return {
    type: SET_NEW_MATCH_TEAM_B_PLAYER_1,
    payload
  };
}

export function setNewMatchTeamAScore(payload) {
  return {
    type: SET_NEW_MATCH_TEAM_A_SCORE,
    payload
  };
}

export function setNewMatchTeamBScore(payload) {
  return {
    type: SET_NEW_MATCH_TEAM_B_SCORE,
    payload
  };
}

export function setNewMatchTournament(payload) {
  return {
    type: SET_NEW_MATCH_TOURNAMENT,
    payload
  };
}

export function saveNewMatch() {
  return {
    type: SAVE_NEW_MATCH
  };
}
