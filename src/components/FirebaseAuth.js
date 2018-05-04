import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../firebase'
import { signedIn } from '../actions/auth'

const mapDispatchToProps = {
  signedIn
}

let unsubscribe = null

class FirebaseAuth extends Component {
  componentWillMount() {
    unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        this.props.signedIn(user)
      }
    })
  }

  componentWillUnmount() {
    if (unsubscribe) unsubscribe()
  }

  render() {
    return null
  }
}

FirebaseAuth.propTypes = {
  signedIn: PropTypes.func
}

export default connect(null, mapDispatchToProps)(FirebaseAuth)
