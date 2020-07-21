import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestionsApi } from '../actions';

class GameScreen extends Component {
  static carregaBotoes(respostas, correct) {
    return respostas.map((alternativa) =>
      (alternativa === correct ? (
        <button key={alternativa} type="button" data-testid="correct-answer">
          {alternativa}
        </button>
      ) : (
        <button key={alternativa} type="button" data-testid="wrong-answer-index">
          {alternativa}
        </button>
      )),
    );
  }

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
    return array;
  }

  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
  }

  componentDidMount() {
    const { pegaPerguntas } = this.props;
    const token = localStorage.getItem('token');
    pegaPerguntas(token);
  }

  renderQuestions() {
    const { position } = this.state;
    const { questions } = this.props;
    const correctResp = questions[position].correct_answer;
    const respostas = GameScreen.embaralhar([
      ...questions[position].incorrect_answers,
      correctResp,
    ]);

    if (questions === null) return <Redirect to="/feedback" />;

    return (
      <div>
        <div>
          <h3 data-testid="question-category">{questions[position].category}</h3>
          <p data-testid="question-text">{questions[position].question}</p>
        </div>
        {GameScreen.carregaBotoes(respostas, correctResp)}
        <button data-testid="btn-next" type="button" onClick={this.nextQuestion}>
          Próxima
        </button>
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
        <Timer />
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
  questions: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
