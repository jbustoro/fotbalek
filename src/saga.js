import { takeLatest, call } from 'redux-saga/effects';
import { saveDataIntoFirestore } from './components/FirebaseData';
import { SAVE_NEW_MATCH } from './constants';

function* saveNewMatchIntoFirestore(action) {
  const {
    playedAt,
    result: { scoreA, scoreB },
    teams: { teamA: { playerA0, playerA1 }, teamB: { playerB0, playerB1 } },
    tournamentId
  } = action.payload;

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
  };

  yield call(saveDataIntoFirestore, transformedNewMatch);
}

function* saga() {
  yield takeLatest(SAVE_NEW_MATCH, saveNewMatchIntoFirestore);
}

export default saga;
