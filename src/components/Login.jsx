import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getLocale = this.getLocale.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
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
      })
    );
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="name">
            Digite seu nome
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              data-testid="input-player-name"
              placeholder="digite seu nome"
            />
          </label>
          <label htmlFor="email">
            Digite seu email
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              data-testid="input-gravatar-email"
              placeholder="digite seu email"
            />
          </label>
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
      </div>
    );
  }
}

export default Login;
