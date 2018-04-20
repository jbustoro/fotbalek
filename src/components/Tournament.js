import React, { Component } from 'react';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';
import './Tournament.css';

class Tournament extends Component {
  render() {
    const { tournament } = this.props;

    return (
      <div className="Tournament">
        <p className="Tournament-date">
          {dateformat(tournament.createdAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
        </p>
        <p className="Tournament-active">{tournament.active && 'Active'}</p>
      </div>
    );
  }
}

Tournament.propTypes = {
  tournament: PropTypes.object
};

export default Tournament;
