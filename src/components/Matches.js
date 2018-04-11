import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Match from './Match';
import { matchesSelector } from '../selectors';

const mapStateToProps = state => ({
  matches: matchesSelector(state)
});

class Matches extends Component {
  render() {
    const { matches } = this.props;
    return (
      <div className="Matches">
        <h3>Matches</h3>
        {matches.map((match, key) => <Match key={key} match={match} />)}
      </div>
    );
  }
}

Matches.propTypes = {
  matches: PropTypes.array
};

export default connect(mapStateToProps)(Matches);
