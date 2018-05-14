export function getCurrentTournamentTeams(teams, currentTournament) {
  return teams.filter(team => team.tournamentId === currentTournament)
}

export function getTeamsSortedByWins(currentTournamentTeams) {
  return currentTournamentTeams.sortBy(team => team.wins).reverse()
}
