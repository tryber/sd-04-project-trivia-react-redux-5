import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { limpaTudo } from '../actions';

class FeedBackButtons extends Component {
  render() {
    const { limpaBagunca } = this.props;
    return (
      <div>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            onClick={() => {
              localStorage.setItem('state', '');
              limpaBagunca();
            }}
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/Ranking">
          <button data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  limpaBagunca: () => dispatch(limpaTudo()),
});

FeedBackButtons.propTypes = {
  limpaBagunca: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FeedBackButtons);
