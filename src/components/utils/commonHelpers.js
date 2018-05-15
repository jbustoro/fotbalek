import moment from 'moment'

export function getPlayerGFGA(goalsFor, goalsAgainst) {
  return goalsFor === 0 && goalsAgainst === 0
    ? (0).toFixed(2)
    : (goalsFor / goalsAgainst).toFixed(2)
}

export function getFormatedDate(date) {
  return moment(date).format(`MMMM Do YYYY, h:mm:ss a`)
}

export function getMatchesSortedByDate(matches) {
  return matches.sortBy(match => match.playedAt).reverse()
}

export function getMatchesToMap(orderedMatches, currentTournament) {
  return !currentTournament
    ? orderedMatches.valueSeq()
    : orderedMatches /*eslint-disable indent*/
        .filter(match => match.tournamentId === currentTournament)
        .valueSeq() /*eslint-enable indent*/
}
