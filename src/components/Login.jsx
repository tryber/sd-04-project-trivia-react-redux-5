import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.getValue = this.getValue.bind(this);
    this.getLocale = this.getLocale.bind(this);
  }

  getLocale() {
    const { name, email } = this.state;
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          name,
          assertions: 0,
          score: 0,
          gravatarEmail: email,
        },
      }),
    );
  }

  getValue(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="name">Digite seu nome</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.getValue}
          data-testid="input-player-name"
        />
        <label htmlFor="email">Digite seu email</label>
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.getValue}
          data-testid="input-gravatar-email"
        />
        <Link to="/GameScreen">
          <button
            type="button"
            data-testid="btn-play"
            disabled={(this.state.email.length && this.state.name.length) < 1}
            onClick={() => this.getLocale()}
          >
            Jogar!
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
