import { Record } from 'immutable';
import * as constants from '../constants';

const initialState = Record({
  authStatus: constants.ANONYMOUS,
  currentUser: null,
  matches: [],
  players: [],
  tournaments: [],
  currentItem: ''
});

const defaultState = new initialState();

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.ATTEMPTING_LOGIN:
      return state.set('authStatus', constants.ATTEMPTING_LOGIN);
    case constants.SIGNED_IN:
      return state
        .set('authStatus', constants.SIGNED_IN)
        .set('currentUser', action.payload);
    case constants.SIGNED_OUT:
      return state
        .set('authStatus', constants.ANONYMOUS)
        .set('currentUser', null);
    case constants.LOAD_MATCHES_DATA:
      return state.set('matches', action.payload);
    case constants.LOAD_PLAYERS_DATA:
      return state.set('players', action.payload);
    case constants.LOAD_TOURNAMENTS_DATA:
      return state.set('tournaments', action.payload);
    case constants.DISPLAY_MATCHES:
      return state.set('currentItem', constants.DISPLAY_MATCHES);
    case constants.DISPLAY_PLAYERS:
      return state.set('currentItem', constants.DISPLAY_PLAYERS);
    case constants.DISPLAY_TOURNAMENTS:
      return state.set('currentItem', constants.DISPLAY_TOURNAMENTS);
    default:
      return state;
  }
};

export default rootReducer;
