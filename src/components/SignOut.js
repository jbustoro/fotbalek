import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { auth } from '../firebase';
import { signedOut } from '../actions/auth';
import './SignOut.css';

const mapDispatchToProps = {
  signedOut
};

class SignOut extends Component {
  handleClick() {
    auth.signOut();
    this.props.signedOut();
  }

  render() {
    return (
      <div className="SignOut">
        <Button onClick={() => this.handleClick()}>Sign Out</Button>
      </div>
    );
  }
}

SignOut.propTypes = {
  signedOut: PropTypes.func
};

export default connect(null, mapDispatchToProps)(SignOut);
