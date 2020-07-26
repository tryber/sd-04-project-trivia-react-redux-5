import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestionsApi, setIsDisabled, setNextQuestion, sumPoints } from '../actions';
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
      redirect: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { pegaPerguntas } = this.props;
    const token = localStorage.getItem('token');
    pegaPerguntas(token);
  }

  carregaBotoes(respostas, correct, value, colorCorrect, colorIncorrect) {
    const { classe, isDisabled, setIsDisableds, calcPoints } = this.props;
    return respostas.map((alternativa) =>
      alternativa === correct ? (
        <button
          key={alternativa}
          type="button"
          style={{ border: colorCorrect }}
          data-testid="correct-answer"
          onClick={() => {
            setIsDisableds()
            calcPoints(value)
          }}
          disabled={!isDisabled}
          className={classe ? 'correctAnswer' : null}
        >
          {alternativa}
        </button>
      ) : (
        <button
          key={alternativa}
          type="button"
          style={{ border: colorIncorrect }}
          data-testid="wrong-answer-index"
          onClick={() => setIsDisableds()}
          disabled={!isDisabled}
          className={classe ? 'incorrectAnswer' : null}
        >
          {alternativa}
        </button>
      )
    );
  }

  nextQuestion() {
    const { setIsDisableds, position, forwardQuestion } = this.props;
    if (position < 4) {
      setIsDisableds();
      forwardQuestion();
      this.setState((state) => ({
        enableNxt: !state.enableNxt,
      }));
    } else {
      setIsDisableds();
      this.setState({
        redirect: true,
      });
    }
  }

  renderTimer() {
    return <Timer/>;
  }

  questionValue(level) {
    return (level === 'easy') ? 1 : (level === 'medium') ? 2 : 3;
  }

  renderQuestions() {
    const { redirect } = this.state;
    const { isDisabled, questions, position } = this.props;
    const difficulty = this.questionValue(questions[position].difficulty);
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
        {this.carregaBotoes(respostas, correctResp, difficulty)}
        {!isDisabled && (<button
          data-testid="btn-next"
          type="button"
          onClick={this.nextQuestion}
        >
          Próxima
        </button>)}
        {this.renderTimer()}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.questionReducer.isFetching,
  points: state.timerReducer.points,
  questions: state.questionReducer.questions,
  isDisabled: state.questionReducer.isDisabled,
  classe: state.questionReducer.classe,
  position: state.questionReducer.position,
});

const mapDispatchToProps = (dispatch) => ({
  pegaPerguntas: (token) => dispatch(getQuestionsApi(token)),
  setIsDisableds: () => dispatch(setIsDisabled()),
  forwardQuestion: () => dispatch(setNextQuestion()),
  calcPoints: (value) => dispatch(sumPoints(value)),
});

GameScreen.propTypes = {
  points: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  classe: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pegaPerguntas: PropTypes.func.isRequired,
  setIsDisableds: PropTypes.func.isRequired,
  forwardQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
