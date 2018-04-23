import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import { tournamentsSelector } from '../selectors';

const mapStateToProps = state => ({
  tournaments: tournamentsSelector(state)
});

class SelectTournament extends Component {
  render() {
    const { tournaments, onChange } = this.props;

    return (
      <select onChange={onChange}>
        <option>Select a tournament</option>
        {_.map(tournaments, (tournament, key) => (
          <option key={key} value={key}>
            {dateFormat(
              tournament.createdAt,
              'dddd, mmmm dS, yyyy, h:MM:ss TT'
            )}
          </option>
        ))}
      </select>
    );
  }
}

SelectTournament.propTypes = {
  tournaments: PropTypes.object,
  onChange: PropTypes.func
};

export default connect(mapStateToProps)(SelectTournament);
