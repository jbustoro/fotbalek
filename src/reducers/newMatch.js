import { Record } from 'immutable'
import moment from 'moment'
import { OPEN_MODAL, CLOSE_MODAL, SET_NEW_MATCH } from '../constants'

const initialState = Record({
  modalOpen: false,
  newMatch: {
    playedAt: null,
    scoreA: 10,
    scoreB: ``,
    playerA0: null,
    playerA1: null,
    playerB0: null,
    playerB1: null,
    tournamentId: null
  }
})

const defaultState = new initialState()

export default function newMatch(state = defaultState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return state.set(`modalOpen`, true)
    case CLOSE_MODAL: {
      const clearNewMatch = {
        playedAt: null,
        scoreA: 10,
        scoreB: ``,
        playerA0: null,
        playerA1: null,
        playerB0: null,
        playerB1: null,
        tournamentId: null
      }
      return state.set(`modalOpen`, false).set(`newMatch`, clearNewMatch)
    }
    case SET_NEW_MATCH: {
      let playerA0, playerA1, playerB0, playerB1, scoreA, scoreB, tournamentId

      if (action.PLAYER_0) {
        if (action.TEAM_A) {
          playerA0 = action.payload
        } else if (action.TEAM_B) {
          playerB0 = action.payload
        }
      } else if (action.PLAYER_1) {
        if (action.TEAM_A) {
          playerA1 = action.payload
        } else if (action.TEAM_B) {
          playerB1 = action.payload
        }
      } else if (action.SCORE) {
        if (action.TEAM_A) {
          scoreA = action.payload
        } else if (action.TEAM_B) {
          scoreB = action.payload
        }
      } else if (action.TOURNAMENT) {
        tournamentId = action.payload
      }

      const newMatchObj = {
        playedAt: moment().format(),
        scoreA:
          scoreA !== null && scoreA !== undefined
            ? scoreA
            : state.newMatch.scoreA,
        scoreB:
          scoreB !== null && scoreB !== undefined
            ? scoreB
            : state.newMatch.scoreB,
        playerA0: playerA0 ? playerA0 : state.newMatch.playerA0,
        playerA1: playerA1 ? playerA1 : state.newMatch.playerA1,
        playerB0: playerB0 ? playerB0 : state.newMatch.playerB0,
        playerB1: playerB1 ? playerB1 : state.newMatch.playerB1,
        tournamentId: tournamentId ? tournamentId : state.newMatch.tournamentId
      }

      return state.set(`newMatch`, newMatchObj)
    }
    default:
      return state
  }
}
