import dateFormat from 'dateformat'

function getFormatedDate(date) {
  return dateFormat(date, `yyyy-m-d`)
}

function getYesterdaysDate() {
  const yesterday = new Date()

  return yesterday.setDate(yesterday.getDate() - 1)
}

export function getLastSnapshot(snapshots) {
  return snapshots[getFormatedDate(getYesterdaysDate())]
}

export function getPLayersSortedByOrder(players) {
  return players.sortBy(player => player.order)
}

export function getSnapshotRating(lastSnapshot, playerId) {
  return lastSnapshot && lastSnapshot[playerId]
}
