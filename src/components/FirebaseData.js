import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { firestore } from '../firebase';
import {
  loadMatchesData,
  loadPlayersData,
  loadTournamentsData
} from '../actions';

const mapDispatchToProps = {
  loadMatchesData,
  loadPlayersData,
  loadTournamentsData
};

const matchesRef = firestore.collection('matches').limit(100);
const playersRef = firestore.collection('players').limit(100);
const tournamentsRef = firestore.collection('tournaments').limit(100);

const matches = {};
const players = {};
const tournaments = {};

export const saveNewMatchIntoFirestore = data => {
  firestore.collection('matches').add(data);
};

class FirebaseData extends Component {
  componentDidMount() {
    matchesRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (matches[doc.id] = doc.data()));
        this.props.loadMatchesData(matches);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );

    playersRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (players[doc.id] = doc.data()));
        this.props.loadPlayersData(players);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );

    tournamentsRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => (tournaments[doc.id] = doc.data()));
        this.props.loadTournamentsData(tournaments);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  render() {
    return null;
  }
}

FirebaseData.propTypes = {
  loadMatchesData: PropTypes.func,
  loadPlayersData: PropTypes.func,
  loadTournamentsData: PropTypes.func
};

export default connect(null, mapDispatchToProps)(FirebaseData);
