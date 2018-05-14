export function getMatchesSortedByDate(matches) {
  return matches.sortBy(match => match.playedAt).reverse()
}

export function getMatchesToMap(orderedMatches, currentTournament) {
  return !currentTournament
    ? orderedMatches
    : orderedMatches.filter(match => match.tournamentId === currentTournament)
}
