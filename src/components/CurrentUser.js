import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../firebase';
import { currentUserSelector } from '../selectors';
import './CurrentUser.css';

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state)
});

class CurrentUser extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className="CurrentUser">
        <img
          className="CurrentUser--photo"
          src={currentUser.photoURL}
          alt={currentUser.displayName}
        />
        <div className="CurrentUser--identification">
          <h3>{currentUser.displayName}</h3>
          <p>{currentUser.email}</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
  })
};

export default connect(mapStateToProps)(CurrentUser);
