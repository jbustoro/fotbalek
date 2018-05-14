import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { auth, googleAuthProvider } from '../../firebase'
import { attemptingLogin, authPopupClosed } from '../../actions/auth'
import './SignIn.css'

const AUTH_POPUP_CLOSED_BY_USER = `auth/popup-closed-by-user`

const mapDispatchToProps = {
  attemptingLogin,
  authPopupClosed
}

class SignIn extends Component {
  handleClick() {
    this.props.attemptingLogin()
    auth.signInWithPopup(googleAuthProvider).catch(error => {
      if (error.code === AUTH_POPUP_CLOSED_BY_USER) {
        this.props.authPopupClosed()
      }
    })
  }

  render() {
    return (
      <div className="SignIn">
        <Button bsStyle="primary" onClick={() => this.handleClick()}>
          Sign In
        </Button>
      </div>
    )
  }
}

SignIn.propTypes = {
  attemptingLogin: PropTypes.func,
  authPopupClosed: PropTypes.func
}

export default connect(null, mapDispatchToProps)(SignIn)
