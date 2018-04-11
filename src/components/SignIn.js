import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, googleAuthProvider } from '../firebase';
import { attemptingLogin } from '../actions/auth';

const mapDispatchToProps = {
  attemptingLogin
};

class SignIn extends Component {
  handleClick() {
    this.props.attemptingLogin();
    auth.signInWithPopup(googleAuthProvider);
  }

  render() {
    return (
      <div className="SignIn">
        <button onClick={() => this.handleClick()}>Sign In</button>
      </div>
    );
  }
}

SignIn.propTypes = {
  attemptingLogin: PropTypes.func
};

export default connect(null, mapDispatchToProps)(SignIn);
