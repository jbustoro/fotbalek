import React, { Component } from 'react';
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

const loadedMatches = [];
const loadedPlayers = [];
const loadedTournaments = [];

class FirebaseData extends Component {
  componentDidMount() {
    matchesRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => {
          return loadedMatches.push(doc.data());
        });
        this.props.loadMatchesData(loadedMatches);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );

    playersRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => {
          return loadedPlayers.push(doc.data());
        });
        this.props.loadPlayersData(loadedPlayers);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );

    tournamentsRef.onSnapshot(
      snapshot => {
        snapshot.docs.map(doc => {
          return loadedTournaments.push(doc.data());
        });
        this.props.loadTournamentsData(loadedTournaments);
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
