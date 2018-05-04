import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { auth } from '../firebase'
import { currentUserSelector } from '../selectors'
import { signedOut } from '../actions/auth'
import './CurrentUser.css'

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state)
})

const mapDispatchToProps = {
  signedOut
}

class CurrentUser extends Component {
  handleClick() {
    auth.signOut()
    this.props.signedOut()
  }

  render() {
    const { currentUser } = this.props
    const { providerData: [{ photoURL }] } = currentUser

    return (
      <div className="CurrentUser">
        <img
          className="CurrentUser--photo"
          src={photoURL}
          alt={currentUser.displayName}
        />
        <div className="CurrentUser--identification">
          <h3>{currentUser.displayName}</h3>
          <p>{currentUser.email}</p>
          <Button onClick={() => this.handleClick()}>Sign Out</Button>
        </div>
      </div>
    )
  }
}

CurrentUser.propTypes = {
  signedOut: PropTypes.func,
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser)
