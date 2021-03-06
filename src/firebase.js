import firebase from 'firebase'
import '@firebase/firestore'

const config = {
  apiKey: `AIzaSyA3Tx6BAzbe6jzOPee3hqQn_6ovfCHHaE8`,
  authDomain: `fotbalek-test.firebaseapp.com`,
  databaseURL: `https://fotbalek-test.firebaseio.com`,
  projectId: `fotbalek-test`,
  storageBucket: `fotbalek-test.appspot.com`,
  timestampsInSnapshots: true
}

firebase.initializeApp(config)

export default firebase

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

// const settings = { /* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);
