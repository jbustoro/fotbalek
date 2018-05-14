import _ from 'lodash'
import swal from 'sweetalert'

const ERROR_TITLE = `Oops!`
const SUCCESS_TITLE = `Success`
const WARNING_ICON = `warning`
const SUCCESS_ICON = `success`
const EMPTY_DATA = `Empty data!`
const WRONG_SCORE = `Score must be between 0 and 10!`
const DUPLICATE_PLAYER = `Duplicate player!`
const MATCH_ADDED = `Match added`

function isEmpty(newMatch) {
  return newMatch.includes(null)
}

function isWrongScore(scoreA, scoreB) {
  return scoreA < 0 || scoreB < 0 || scoreA > 10 || scoreB > 10
}

function isDuplicatePlayer(players) {
  return _.uniq(players).length !== players.length
}

export function validateNewMatch(newMatch, addNewMatch, closeModal) {
  const { playerA0, playerA1, playerB0, playerB1, scoreA, scoreB } = newMatch
  const players = [playerA0, playerA1, playerB0, playerB1]

  if (isEmpty([...players, scoreA, scoreB])) {
    return swal(ERROR_TITLE, EMPTY_DATA, WARNING_ICON)
  } else if (isWrongScore(scoreA, scoreB)) {
    return swal(ERROR_TITLE, WRONG_SCORE, WARNING_ICON)
  } else if (isDuplicatePlayer(players)) {
    return swal(ERROR_TITLE, DUPLICATE_PLAYER, WARNING_ICON)
  }

  addNewMatch(newMatch)
  closeModal()

  return swal(SUCCESS_TITLE, MATCH_ADDED, SUCCESS_ICON)
}
