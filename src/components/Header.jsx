import React from 'react';
import sha256 from 'crypto-js/md5';

const Header = () => {
  const imagem = `https://www.gravatar.com/avatar/${hash}`;

  <div>
    <img
      data-testid="header-profile-picture"
      alt="Player"
      src={imagem}
    />
    <div data-testid="header-player-name"></div>
    <div data-testid="header-score"></div>
  </div>
}

export default Header;