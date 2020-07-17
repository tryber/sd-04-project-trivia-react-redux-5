import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '', 
    }
  }

  componentDidMount() {
    const { gravatarEmail } = JSON.parse(localStorage.getItem('state'));
    this.setState({ src: `https://www.gravatar.com/avatar/${gravatarEmail}` });
  }

  render() {
    const { src } = this.state;
    return (
    <div>
      <img
        data-testid="header-profile-picture"
        alt="Player"
        src={src}
      />
      <div data-testid="header-player-name"></div>
      <div data-testid="header-score"></div>
    </div>);    
  } 
}

export default Header;
