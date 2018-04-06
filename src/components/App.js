import React, { Component } from 'react';
import { auth, firestore } from '../firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import Matches from './Matches';
import Players from './Players';
import Tournaments from './Tournaments';
import './App.css';

const SHOW_MATCHES = 'SHOW_MATCHES';
const SHOW_PLAYERS = 'SHOW_PLAYERS';
const SHOW_TOURNAMENTS = 'SHOW_TOURNAMENTS';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      matches: [],
      players: [],
      snapshots: [],
      teams: [],
      tournaments: [],
      currentItem: null
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
      this.matchesRef.onSnapshot(
        snapshot => {
          snapshot.docs.map(doc => {
            this.setState({
              ...this.state,
              matches: [...this.state.matches, doc.data()]
            });
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );

      // Players
      this.playersRef.onSnapshot(
        snapshot => {
          snapshot.docs.map(doc => {
            this.setState({
              ...this.state,
              players: [...this.state.players, doc.data()]
            });
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );

      // Tournaments
      this.tournamentsRef.onSnapshot(
        snapshot => {
          snapshot.docs.map(doc => {
            this.setState({
              ...this.state,
              tournaments: [...this.state.tournaments, doc.data()]
            });
          });
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
      //
      // // Snapshots
      // this.snapshotsRef.onSnapshot(
      //   snapshot => {
      //     snapshot.docs.map(doc => {
      //       this.setState({
      //         ...this.state,
      //         snapshots: [...this.state.snapshots, doc.data()]
      //       });
      //     });
      //   },
      //   err => {
      //     console.log(`Encountered error: ${err}`);
      //   }
      // );
      //
      // // Teams
      // this.teamsRef.onSnapshot(
      //   snapshot => {
      //     snapshot.docs.map(doc => {
      //       this.setState({
      //         ...this.state,
      //         teams: [...this.state.teams, doc.data()]
      //       });
      //     });
      //   },
      //   err => {
      //     console.log(`Encountered error: ${err}`);
      //   }
      // );
    });
  }

  handleClick(item) {
    this.setState({
      ...this.state,
      currentItem: item
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
            <div className="container">
              <CurrentUser user={currentUser} />
              <button onClick={() => this.handleClick(SHOW_MATCHES)}>
                Matches
              </button>
              <button onClick={() => this.handleClick(SHOW_PLAYERS)}>
                Players
              </button>
              <button onClick={() => this.handleClick(SHOW_TOURNAMENTS)}>
                Tournaments
              </button>
              {this.state.currentItem === SHOW_MATCHES && (
                <Matches matches={matches} />
              )}
              {this.state.currentItem === SHOW_PLAYERS && (
                <Players players={players} />
              )}
              {this.state.currentItem === SHOW_TOURNAMENTS && (
                <Tournaments tournaments={tournaments} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
