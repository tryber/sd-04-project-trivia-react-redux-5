import React, { Component } from 'react';
import Timer from '../components/Timer';
import Header from '../components/Header';

class GameScreen extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <div>
            <h3 data-testid="question-category">Aqui vai a categoria</h3>
            <p data-testid="question-text">Aqui vai o texto da pergunta</p>
          </div>
          <div>
            <button type="button" data-testid="correct-answer">
              Correta
            </button>
            <button type="button" data-testid="`wrong-answer-${index}`">
              Incorreta
            </button>
          </div>
          <button data-testid="btn-next" type="button">
            Próxima
          </button>
        </div>
        <Timer />
      </div>
    );
  }
}

export default GameScreen;
