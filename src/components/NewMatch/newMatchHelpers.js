import _ from 'lodash'
import swal from 'sweetalert'

const TITLE = `Oops!`
const ICON = `warning`
const EMPTY_DATA = `Empty data!`
const WRONG_SCORE = `Score must be between 0 and 10!`
const DUPLICATE_PLAYER = `Duplicate player!`

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
    return swal(TITLE, EMPTY_DATA, ICON)
  } else if (isWrongScore(scoreA, scoreB)) {
    return swal(TITLE, WRONG_SCORE, ICON)
  } else if (isDuplicatePlayer(players)) {
    return swal(TITLE, DUPLICATE_PLAYER, ICON)
  }

  addNewMatch(newMatch)
  closeModal()

  return swal(`Success`, `Match added!`, `success`)
}
