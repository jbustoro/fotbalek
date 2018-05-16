import moment from 'moment'

function getYesterdaysDate() {
  return moment()
    .subtract(1, `day`)
    .format(`YYYY-M-D`)
}

export function getLastSnapshot(snapshots) {
  return snapshots[getYesterdaysDate()]
}

export function getPlayersSortedByRating(players) {
  return players.sortBy(player => player.rating).reverse()
}

export function getSnapshotRating(lastSnapshot, playerId) {
  return lastSnapshot && lastSnapshot[playerId]
}
