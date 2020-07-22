import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestionsApi } from '../actions';
import './GameScreen.css';


class GameScreen extends Component {
  static embaralhar(array) {
    const newArray = [...array];
    let indiceAtual = array.length;
    let valorTemporario = 0;
    let indiceAleatorio = 0;
    while (indiceAtual !== 0) {
      indiceAleatorio = Math.floor(Math.random() * indiceAtual);
      indiceAtual -= 1;
      valorTemporario = newArray[indiceAtual];
      newArray[indiceAtual] = newArray[indiceAleatorio];
      newArray[indiceAleatorio] = valorTemporario;
    }
    return newArray;
  }

  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      redirect: false,
      isDisabled: true,
      time: 30,
      classe: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.enableButtons = this.enableButtons.bind(this);
  }

  componentDidMount() {
    const { pegaPerguntas } = this.props;
    const token = localStorage.getItem('token');
    pegaPerguntas(token);
  }

  enableButtons() {
    const { isDisabled } = this.state;
    this.setState({
      isDisabled: !isDisabled,
      classe: true
    });
  }

  carregaBotoes(respostas, correct, colorCorrect, colorIncorrect) {
    return respostas.map((alternativa) =>
      alternativa === correct ? (
        <button
          key={alternativa}
          type="button"
          style={{ border: colorCorrect }}
          data-testid="correct-answer"
          onClick={() => this.enableButtons()}
          disabled={!this.state.isDisabled}
          className={this.state.classe ? 'correctAnswer' : null}
        >
          {alternativa}
        </button>
      ) : (
        <button
          key={alternativa}
          type="button"
          style={{ border: colorIncorrect }}
          data-testid="wrong-answer-index"
          onClick={() => this.enableButtons()}
          disabled={!this.state.isDisabled}
          className={this.state.classe ? 'incorrectAnswer' : null}
        >
          {alternativa}
        </button>
      )
    );
  }

  nextQuestion() {
    const { position } = this.state;
    if (position < 4) {
      this.setState({
        position: position + 1,
        isDisabled: true,
        classe: false,
      });
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  renderQuestions() {
    const { position, isDisabled, redirect } = this.state;
    const { questions } = this.props;
    const correctResp = questions[position].correct_answer;
    const respostas = GameScreen.embaralhar([
      ...questions[position].incorrect_answers,
      correctResp,
    ]);

    if (redirect) return <Redirect to="/feedback" />;

    return (
      <div>
        <div>
          <h3 data-testid="question-category">
            {questions[position].category}
          </h3>
          <p data-testid="question-text">{questions[position].question}</p>
        </div>
        {this.carregaBotoes(respostas, correctResp)}
        {!isDisabled && (<button
          data-testid="btn-next"
          type="button"
          onClick={this.nextQuestion}
        >
          Próxima
        </button>)}
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) return <div>Loading...</div>;

    return (
      <div>
        <Header />
        {this.renderQuestions()}
        {/* <Timer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.questionReducer.isFetching,
  questions: state.questionReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  pegaPerguntas: (token) => dispatch(getQuestionsApi(token)),
});

GameScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  pegaPerguntas: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
