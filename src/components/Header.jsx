import React from 'react';
import { INITIAL_STORAGE_STATE } from '../services/localStorageAPI';

const Header = () => {
  const state = JSON.parse(localStorage.getItem('state')) || INITIAL_STORAGE_STATE;
  const { name, userImagem, score } = state.player;
  return (
    <div>
      <img
        data-testid="header-profile-picture"
        alt="Player"
        src={userImagem}
      />
      <div data-testid="header-player-name">{name}</div>
      <div data-testid="header-score">{score}</div>
    </div>
  );
}

export default Header;
