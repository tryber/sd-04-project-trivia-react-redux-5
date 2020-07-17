import React, { Component } from 'react';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  // componentDidMount() {
  //   const {  }
  // }

  render() {
    const { index } = this.state;
    return (
      <div>
        <div>
          <h3 data-testid="question-category">Aqui vai a categoria</h3>
          <p data-testid="question-text">Aqui vai o texto da pergunta</p>
        </div>
        <div>
          <button type="button" data-testid="correct-answer">
            Correta
          </button>
          <button type="button" data-testid={`wrong-answer-${index}`}>
            Incorreta
          </button>
        </div>
        <button data-testid="btn-next" type="button">
          Próxima
        </button>
      </div>
    );
  }
}

export default GameScreen;
