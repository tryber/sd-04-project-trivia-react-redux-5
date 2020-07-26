import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { INITIAL_STORAGE_STATE } from '../services/localStorageAPI';

class Header extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state')) || INITIAL_STORAGE_STATE;
    const { name, userImagem } = state.player;
    const { points } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" alt="Player" src={userImagem} />
        <div data-testid="header-player-name">{name}</div>
        <div data-testid="header-score">{points}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  points: state.timerReducer.points,
});

Header.propTypes = {
  points: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
