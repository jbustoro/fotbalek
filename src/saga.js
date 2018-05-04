import { put, call, takeLatest } from 'redux-saga/effects'
import { saveNewMatchIntoFirestore } from './components/FirebaseData/FirebaseData'
import { ADD_NEW_MATCH, MATCH_SAVED } from './constants'

function* saveNewMatch(action) {
  const {
    playedAt,
    scoreA,
    scoreB,
    playerA0,
    playerA1,
    playerB0,
    playerB1,
    tournamentId
  } = action.payload

  const transformedNewMatch = {
    playedAt,
    result: [scoreA, scoreB],
    teams: {
      0: {
        0: playerA0,
        1: playerA1
      },
      1: {
        0: playerB0,
        1: playerB1
      }
    },
    tournamentId
  }

  yield call(saveNewMatchIntoFirestore, transformedNewMatch)
  yield put({ type: MATCH_SAVED })
}

function* saga() {
  yield takeLatest(ADD_NEW_MATCH, saveNewMatch)
}

export default saga
