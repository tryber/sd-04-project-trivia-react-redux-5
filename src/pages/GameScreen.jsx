import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Timer from '../components/Timer';
import Header from '../components/Header';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 4,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { quantidade } = this.state;
    this.setState({ quantidade: quantidade - 1 });
  }

  render() {
    const { quantidade } = this.state;

    if (!quantidade) return (<Redirect to="/Feedback" />);
    
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
          <button
            data-testid="btn-next"
            type="button"
            onClick={this.nextQuestion}
          >
            Próxima
          </button>
        </div>
        <Timer />
      </div>
    );
  }
}

export default GameScreen;
