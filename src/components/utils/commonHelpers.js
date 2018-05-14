import moment from 'moment'

export function getPlayerGFGA(goalsFor, goalsAgainst) {
  return goalsFor === 0 && goalsAgainst === 0
    ? (0).toFixed(2)
    : (goalsFor / goalsAgainst).toFixed(2)
}

export function getFormatedDate(date) {
  return moment(date).format(`MMMM Do YYYY, h:mm:ss a`)
}
