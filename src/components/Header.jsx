import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { gravatarEmail } = JSON.parse(localStorage.getItem('state'));
    const imagem = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="Player"
          src={imagem}
        />
        <div data-testid="header-player-name"></div>
        <div data-testid="header-score"></div>
      </div>
    );
  }
}

export default Header;
