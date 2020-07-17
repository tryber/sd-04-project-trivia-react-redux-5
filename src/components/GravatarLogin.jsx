import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MD5 from 'crypto-js/md5';
import { createPlayerInLocalStorage } from '../services/localStorageAPI';
import tokenApi from '../services/tokenApi';

class GravatarLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.getValue = this.getValue.bind(this);
  }

  componentDidMount() {
    tokenApi().then((resposta) => {
      const reqResponse = resposta.response_code;
      if (reqResponse === 0) localStorage.setItem('token', resposta.token);
    });
  }

  getValue(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  renderName() {
    return (
      <div>
        <label htmlFor="name">Digite seu nome</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.getValue}
          data-testid="input-player-name"
        />
      </div>
    );
  }

  renderEmail() {
    return (
      <div>
        <label htmlFor="email">Digite seu email</label>
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.getValue}
          data-testid="input-gravatar-email"
        />
      </div>
    );
  }

  createGravatar() {
    const { name, email } = this.state;
    const hash = MD5(email.toLowerCase()).toString();
    createPlayerInLocalStorage(name, hash);
  }
  
  render() {
    return (
      <form>
        {this.renderName()}
        {this.renderEmail()}
        <Link to="/GameScreen">
          <button
            type="button"
            data-testid="btn-play"
            disabled={(this.state.email.length && this.state.name.length) < 1}
            onClick={() => this.createGravatar()}
          >
            Jogar!
          </button>
        </Link>
      </form>
    );
  }
}


export default GravatarLogin;
