import { Record, Map } from 'immutable';
import dateFormat from 'dateformat';
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
  SET_NEW_MATCH
} from '../constants';

// TODO use a common key for teamA and teamB (score, players...), change the set new match to only one action and change only the given data in the state
// export const teamA = 'teamA';
// export const teamB = 'teamB';

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
      scoreA: '',
      scoreB: ''
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
    case SET_NEW_MATCH: {
      let playerA0, playerA1, playerB0, playerB1, scoreA, scoreB, tournamentId;

      if (action.PLAYER_0) {
        if (action.TEAM_A) {
          playerA0 = action.payload;
        } else if (action.TEAM_B) {
          playerB0 = action.payload;
        }
      } else if (action.PLAYER_1) {
        if (action.TEAM_A) {
          playerA1 = action.payload;
        } else if (action.TEAM_B) {
          playerB1 = action.payload;
        }
      } else if (action.SCORE) {
        if (action.TEAM_A) {
          scoreA = action.payload;
        } else if (action.TEAM_B) {
          scoreB = action.payload;
        }
      } else if (action.TOURNAMENT) {
        tournamentId = action.payload;
      }

      const newMatch = {
        playedAt: dateFormat(new Date(), 'isoDateTime'),
        result: {
          scoreA: scoreA ? scoreA : state.newMatch.result.scoreA,
          scoreB: scoreB ? scoreB : state.newMatch.result.scoreB
        },
        teams: {
          teamA: {
            playerA0: playerA0 ? playerA0 : state.newMatch.teams.teamA.playerA0,
            playerA1: playerA1 ? playerA1 : state.newMatch.teams.teamA.playerA1
          },
          teamB: {
            playerB0: playerB0 ? playerB0 : state.newMatch.teams.teamB.playerB0,
            playerB1: playerB1 ? playerB1 : state.newMatch.teams.teamB.playerB1
          }
        },
        tournamentId: tournamentId ? tournamentId : state.newMatch.tournamentId
      };

      return state.set('newMatch', newMatch);
    }
    default:
      return state;
  }
};

// TODO Separate into diferent files, use combinedReducers
export default rootReducer;
