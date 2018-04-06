import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tournament.css';

class Tournament extends Component {
  render() {
    const { tournament } = this.props;

    return (
      <div className="Tournament">
        <li>{tournament.active && 'Active'}</li>
        <li>{tournament.createdAt}</li>
        <li>{tournament.name}</li>
      </div>
    );
  }
}

Tournament.propTypes = {
  tournament: PropTypes.object
};

export default Tournament;
