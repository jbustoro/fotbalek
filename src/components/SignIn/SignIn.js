import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { auth, googleAuthProvider } from '../../firebase'
import { attemptingLogin } from '../../actions/auth'
import './SignIn.css'

const mapDispatchToProps = {
  attemptingLogin
}

class SignIn extends Component {
  handleClick() {
    this.props.attemptingLogin()
    auth.signInWithPopup(googleAuthProvider)
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
  attemptingLogin: PropTypes.func
}

export default connect(null, mapDispatchToProps)(SignIn)
