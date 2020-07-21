import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


class Ranking extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Voltar à tela inicial
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
