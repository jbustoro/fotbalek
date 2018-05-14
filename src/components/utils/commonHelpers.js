import dateFormat from 'dateformat'

export function getPlayerGFGA(goalsFor, goalsAgainst) {
  return goalsFor === 0 && goalsAgainst === 0
    ? (0).toFixed(2)
    : (goalsFor / goalsAgainst).toFixed(2)
}

export function getFormatedDate(date) {
  return dateFormat(date, `dddd, mmmm dS, yyyy, h:MM:ss TT`)
}
