import React, { Component } from 'react';
import Header from '../components/Header';
import { INITIAL_STORAGE_STATE } from '../services/localStorageAPI';
import FeedBackButtons from '../components/FeedBackButtons';

const feedbackText = (assertions) => {
  if (assertions < 3) return 'Podia ser melhor...';
  if (assertions >= 3) return 'Mandou bem!';
  return null;
};

class FeedBack extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state')) || INITIAL_STORAGE_STATE;
    const { score, assertions } = state.player;

    return (
      <div>
        <Header />
        <div>
          <h1>Feedback</h1>
          <div>
            <h3 data-testid="feedback-text">{feedbackText(assertions)}</h3>
            <h4>
              Pontuação <span data-testid="feedback-total-score">{score}</span>
            </h4>
            <h4>
              Acertos <span data-testid="feedback-total-question">{assertions}</span>
            </h4>
          </div>
          <FeedBackButtons />
        </div>
      </div>
    );
  }
}

export default FeedBack;
