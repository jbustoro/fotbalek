import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tournament.css';

class Tournament extends Component {
  render() {
    const { tournament } = this.props;
    console.log(tournament);
    return (
      <div className="Tournament">
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
