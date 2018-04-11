import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tournament from './Tournament';
import { tournamentsSelector } from '../selectors';

const mapStateToProps = state => ({
  tournaments: tournamentsSelector(state)
});

class Tournaments extends Component {
  render() {
    const { tournaments } = this.props;

    return (
      <div className="Tournaments">
        <h3>Tournaments</h3>
        {tournaments.map((tournament, key) => (
          <Tournament key={key} tournament={tournament} />
        ))}
      </div>
    );
  }
}

Tournaments.propTypes = {
  tournaments: PropTypes.array
};

export default connect(mapStateToProps)(Tournaments);
