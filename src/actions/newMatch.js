import { SET_NEW_MATCH, ADD_NEW_MATCH } from '../constants';

export function setNewMatch(
  TEAM_A,
  TEAM_B,
  PLAYER_0,
  PLAYER_1,
  SCORE,
  TOURNAMENT,
  payload
) {
  return {
    type: SET_NEW_MATCH,
    TEAM_A,
    TEAM_B,
    PLAYER_0,
    PLAYER_1,
    SCORE,
    TOURNAMENT,
    payload
  };
}

export function addNewMatch(payload) {
  return {
    type: ADD_NEW_MATCH,
    payload
  };
}
