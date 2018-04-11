import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../firebase';
import { signedIn, signedOut } from '../actions/auth';

const mapDispatchToProps = {
  signedIn,
  signedOut
};

let unsubscribe = null;

class FirebaseAuth extends Component {
  componentWillMount() {
    unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        this.props.signedIn(user);
      } else {
        this.props.signedOut();
      }
    });
  }

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    return null;
  }
}

FirebaseAuth.propTypes = {
  signedIn: PropTypes.func,
  signedOut: PropTypes.func
};

export default connect(null, mapDispatchToProps)(FirebaseAuth);
