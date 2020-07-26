import React from 'react';
import { INITIAL_STORAGE_STATE } from '../services/localStorageAPI';
import { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state')) || INITIAL_STORAGE_STATE;
    const { name, userImagem, score } = state.player;
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

export default connect(mapStateToProps)(Header);
