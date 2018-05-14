export function getTournamentsSortedByDate(tournaments) {
  return tournaments.sortBy(tournament => tournament.createdAt).reverse()
}
