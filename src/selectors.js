import {
  getMatchesSortedByDate,
  getMatchesToMap
} from './components/utils/commonHelpers'

export const authStatusSelector = state => state.auth.authStatus
export const isLoadingSelector = state => state.load.isLoading
export const currentUserSelector = state => state.auth.currentUser
export const matchesSelector = state => state.load.matches
export const playersSelector = state => state.load.players
export const tournamentsSelector = state => state.load.tournaments
export const teamsSelector = state => state.load.teams
export const snapshotsSelector = state => state.load.snapshots
export const currentItemSelector = state => state.display.currentItem
export const modalOpenSelector = state => state.newMatch.modalOpen
export const newMatchSelector = state => state.newMatch.newMatch
export const currentTournamentSelector = state =>
  state.display.currentTournament
export const navActiveKeySelector = state => state.display.navActiveKey

export const matchesToMapSelector = state => {
  const matches = matchesSelector(state)
  const currentTournament = currentTournamentSelector(state)
  return getMatchesToMap(getMatchesSortedByDate(matches), currentTournament)
}
