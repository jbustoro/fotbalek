import { Record, Map } from 'immutable';
import {
  ANONYMOUS,
  ATTEMPTING_LOGIN,
  SIGNED_IN,
  SIGNED_OUT,
  LOAD_MATCHES_DATA,
  LOAD_PLAYERS_DATA,
  LOAD_TOURNAMENTS_DATA,
  DISPLAY_MATCHES,
  DISPLAY_PLAYERS,
  DISPLAY_TOURNAMENTS,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_NEW_MATCH_TEAM_A_PLAYER_0,
  SET_NEW_MATCH_TEAM_A_PLAYER_1,
  SET_NEW_MATCH_TEAM_B_PLAYER_0,
  SET_NEW_MATCH_TEAM_B_PLAYER_1,
  SET_NEW_MATCH_TEAM_A_SCORE,
  SET_NEW_MATCH_TEAM_B_SCORE,
  SET_NEW_MATCH_TOURNAMENT
} from '../constants';

const initialState = Record({
  authStatus: ANONYMOUS,
  currentUser: null,
  matches: {},
  players: Map({}),
  tournaments: {},
  currentItem: DISPLAY_MATCHES,
  modalOpen: false,
  newMatch: {
    playedAt: '',
    result: {
      scoreA: 10,
      scoreB: 0
    },
    teams: {
      teamA: {
        playerA0: null,
        playerA1: null
      },
      teamB: {
        playerB0: null,
        playerB1: null
      }
    },
    tournamentId: null
  }
});

const defaultState = new initialState();

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ATTEMPTING_LOGIN:
      return state.set('authStatus', ATTEMPTING_LOGIN);
    case SIGNED_IN:
      return state
        .set('authStatus', SIGNED_IN)
        .set('currentUser', action.payload);
    case SIGNED_OUT:
      return state.set('authStatus', ANONYMOUS).set('currentUser', null);
    case LOAD_MATCHES_DATA:
      return state.set('matches', action.payload);
    case LOAD_PLAYERS_DATA:
      return state.set('players', Map(action.payload));
    case LOAD_TOURNAMENTS_DATA:
      return state.set('tournaments', action.payload);
    case DISPLAY_MATCHES:
      return state.set('currentItem', DISPLAY_MATCHES);
    case DISPLAY_PLAYERS:
      return state.set('currentItem', DISPLAY_PLAYERS);
    case DISPLAY_TOURNAMENTS:
      return state.set('currentItem', DISPLAY_TOURNAMENTS);
    case OPEN_MODAL:
      return state.set('modalOpen', true);
    case CLOSE_MODAL:
      return state.set('modalOpen', false);
    case SET_NEW_MATCH_TEAM_A_PLAYER_0: {
      const newMatch = {
        ...state.newMatch,
        teams: {
          ...state.newMatch.teams,
          teamA: {
            ...state.newMatch.teams.teamA,
            playerA0: action.payload
          }
        }
      };
      return state.set('newMatch', newMatch);
    }
    case SET_NEW_MATCH_TEAM_A_PLAYER_1: {
      const newMatch = {
        ...state.newMatch,
        teams: {
          ...state.newMatch.teams,
          teamA: {
            ...state.newMatch.teams.teamA,
            playerA1: action.payload
          }
        }
      };
      return state.set('newMatch', newMatch);
    }
    case SET_NEW_MATCH_TEAM_B_PLAYER_0: {
      const newMatch = {
        ...state.newMatch,
        teams: {
          ...state.newMatch.teams,
          teamB: {
            ...state.newMatch.teams.teamB,
            playerB0: action.payload
          }
        }
      };
      return state.set('newMatch', newMatch);
    }
    case SET_NEW_MATCH_TEAM_B_PLAYER_1: {
      const newMatch = {
        ...state.newMatch,
        teams: {
          ...state.newMatch.teams,
          teamB: {
            ...state.newMatch.teams.teamB,
            playerB1: action.payload
          }
        }
      };
      return state.set('newMatch', newMatch);
    }
    case SET_NEW_MATCH_TEAM_A_SCORE: {
      const newMatch = {
        ...state.newMatch,
        result: {
          ...state.newMatch.result,
          scoreA: action.payload
        }
      };
      return state.set('newMatch', newMatch);
    }
    case SET_NEW_MATCH_TEAM_B_SCORE: {
      const newMatch = {
        ...state.newMatch,
        result: { ...state.newMatch.result, scoreB: action.payload }
      };
      return state.set('newMatch', newMatch);
    }
    case SET_NEW_MATCH_TOURNAMENT: {
      const newMatch = {
        ...state.newMatch,
        tournamentId: action.payload
      };
      return state.set('newMatch', newMatch);
    }
    default:
      return state;
  }
};

export default rootReducer;
