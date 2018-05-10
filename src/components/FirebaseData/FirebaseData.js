import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firestore } from '../../firebase'
import {
  loadMatchesData,
  loadPlayersData,
  loadTournamentsData,
  loadTeamsData,
  loadSnapshotsData
} from '../../actions/load'

const mapDispatchToProps = {
  loadMatchesData,
  loadPlayersData,
  loadTournamentsData,
  loadTeamsData,
  loadSnapshotsData
}

const matchesRef = firestore.collection('matches').limit(100)
const playersRef = firestore.collection('players').limit(100)
const tournamentsRef = firestore.collection('tournaments').limit(100)
const teamsRef = firestore.collection('teams').limit(100)
const snapshotsRef = firestore.collection('snapshots').limit(100)

const matches = {}
const players = {}
const tournaments = {}
const teams = {}
const snapshots = {}

export const saveNewMatchIntoFirestore = match => {
  firestore.collection('matches').add(match)
}

class FirebaseData extends Component {
  componentDidMount() {
    matchesRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (matches[doc.id] = doc.data()))
        this.props.loadMatchesData(matches)
      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )

    playersRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (players[doc.id] = doc.data()))
        this.props.loadPlayersData(players)
      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )

    tournamentsRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (tournaments[doc.id] = doc.data()))
        this.props.loadTournamentsData(tournaments)
      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )

    teamsRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (teams[doc.id] = doc.data()))
        this.props.loadTeamsData(teams)
      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )

    snapshotsRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (snapshots[doc.id] = doc.data()))
        this.props.loadSnapshotsData(snapshots)
      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )
  }

  render() {
    return null
  }
}

FirebaseData.propTypes = {
  loadMatchesData: PropTypes.func,
  loadPlayersData: PropTypes.func,
  loadTournamentsData: PropTypes.func,
  loadTeamsData: PropTypes.func,
  loadSnapshotsData: PropTypes.func
}

export default connect(null, mapDispatchToProps)(FirebaseData)
