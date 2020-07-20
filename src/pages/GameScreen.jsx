import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestionsApi } from '../actions';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 4,
      position: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    // this.embaralhar = this.embaralhar.bind(this);
    // this.carregaBotoes = this.carregaBotoes.bind(this);
  }

  componentDidMount() {
    const { pegaPerguntas } = this.props;
    const token = localStorage.getItem('token');
    pegaPerguntas(token);
  }

  nextQuestion() {
    const { quantidade } = this.state;
    this.setState({ quantidade: quantidade - 1 });
  }

  // embaralhaPerguntas(certa, erradas) {
  //   const embaralhadas = [...Array(erradas.length + 1).fill('')];
  //   embaralhadas[parseInt(Math.random() * 5)] = certa;
  //   embaralhadas.forEach((pergunta) => {
  //     if (pergunta === '')
  //   });
  // }

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
    let indiceAtual = array.length,
      valorTemporario,
      indiceAleatorio;
    while (indiceAtual !== 0) {
      indiceAleatorio = Math.floor(Math.random() * indiceAtual);
      indiceAtual -= 1;
      valorTemporario = array[indiceAtual];
      array[indiceAtual] = array[indiceAleatorio];
      array[indiceAleatorio] = valorTemporario;
    }
    return array;
  }

  renderQuestions() {
    const { position } = this.state;
    const { questions } = this.props;
    const correctResp = questions[position].correct_answer;
    const respostas = GameScreen.embaralhar([
      ...questions[position].incorrect_answers,
      correctResp,
    ]);
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
    const { quantidade } = this.state;
    const { isFetching } = this.props;

    if (isFetching) return <div>Loading...</div>;

    if (!quantidade) return <Redirect to="/Feedback" />;

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
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
