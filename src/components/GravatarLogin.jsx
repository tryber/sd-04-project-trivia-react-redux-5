import React, { Component } from 'react';
import * as CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { getName, getEmail } from '../actions';
import tokenApi from '../services/tokenApi';

class GravatarLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      token: '',
    };
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState !== this.state) {
      const state = {
        player: {
          name: this.state.name,
          assertions: 0,
          score: 0,
          gravatarEmail: this.state.email,
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  getInfo() {
    const { name, email } = this.state;
    const { setName, setEmail } = this.props;
    tokenApi().then((tokenFetched) => {
      localStorage.setItem('token', tokenFetched.token);
      this.setState({ token: tokenFetched.token });
    });
    setName(name);
    const hash = CryptoJS.MD5(email.trim().toLocaleLowerCase());
    setEmail(email, hash.toString(CryptoJS.enc.Hex));
  }

  render() {
    const { name, email, token } = this.state;
    return (
      <div>
        <img src={`https://www.gravatar.com/avatar/${token}`} alt="gravatar cover" />
        <label htmlFor="name">Digite seu nome</label>
        <input
          id="name"
          type="text"
          data-testid="input-player-name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <label htmlFor="emal">Digite seu e-mail</label>
        <input
          id="emal"
          type="email"
          data-testid="input-gravatar-email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <Link to="/GameScreen">
          <button
            disabled={!name || !email}
            onClick={this.getInfo}
            data-testid="btn-play"
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setName: (name) => dispatch(getName(name)),
  setEmail: (email, hash) => dispatch(getEmail(email, hash)),
});

GravatarLogin.propTypes = {
  setName: propTypes.func.isRequired,
  setEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GravatarLogin);
