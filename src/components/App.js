import React, { Component } from 'react';
import { auth, firestore } from '../firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import Matches from './Matches';
import Players from './Players';
import Tournaments from './Tournaments';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      matches: [],
      players: [],
      snapshots: [],
      teams: [],
      tournaments: []
    };

    this.matchesRef = firestore.collection('matches');
    this.playersRef = firestore.collection('players');
    this.snapshotsRef = firestore.collection('snapshots');
    this.teamsRef = firestore.collection('teams');
    this.tournamentsRef = firestore.collection('tournaments');
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });

      // Matches
      this.matchesRef.get().then(matches => {
        matches.docs.map(doc => {
          this.setState({
            ...this.state,
            matches: [...this.state.matches, doc.data()]
          });
        });
      });

      // Players
      this.playersRef.get().then(players => {
        players.docs.map(doc => {
          this.setState({
            ...this.state,
            players: [...this.state.players, doc.data()]
          });
        });
      });

      // // Snapshots
      // this.snapshotsRef.get().then(snapshots => {
      //   snapshots.docs.map(doc => {
      //     console.log(doc.data());
      //     this.setState({
      //       ...this.state,
      //       snapshots: [...this.state.snapshots, doc.data()]
      //     });
      //   });
      // });
      //
      // // Teams
      // this.teamsRef.get().then(teams => {
      //   teams.docs.map(doc => {
      //     console.log(doc.data());
      //     this.setState({
      //       ...this.state,
      //       teams: [...this.state.teams, doc.data()]
      //     });
      //   });
      // });
      //
      // Tournaments
      this.tournamentsRef.get().then(tournaments => {
        tournaments.docs.map(doc => {
          this.setState({
            ...this.state,
            tournaments: [...this.state.tournaments, doc.data()]
          });
        });
      });
    });
  }

  render() {
    const {
      currentUser,
      matches,
      players,
      snapshots,
      teams,
      tournaments
    } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Fotbalek</h1>
        </header>
        <div>
          {!currentUser && <SignIn />}
          {currentUser && (
            <div>
              <CurrentUser user={currentUser} />
              <Matches matches={matches} />
              <Players players={players} />
              <Tournaments tournaments={tournaments} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
