import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { INITIAL_STORAGE_STATE } from '../services/localStorageAPI';

const feedbackText = (assertions) => {
  if (assertions < 3) return 'Podia ser melhor...';
  if (assertions >= 3) return 'Mandou bem!';
  return null;
};

const FeedBack = () => {
  const state = JSON.parse(localStorage.getItem('state')) || INITIAL_STORAGE_STATE;
  const { score, assertions } = state.player;

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1><strong>Feedback</strong></h1>
        <div>
          <h3 data-testid="feedback-text">{feedbackText(assertions)}</h3>
          <h4>Pontuação <span data-testid="feedback-total-score">{score}</span></h4>
          <h4>Acertos <span data-testid="feedback-total-question">{assertions}</span></h4>
        </div>
        <Link to="/" >
          <button data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to={'Ranking'}>
          <button data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    </div>
  );
}

export default FeedBack;
