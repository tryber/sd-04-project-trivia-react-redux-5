import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { getQuestionsApi } from '../actions';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 4,
      position: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { getQuestionsApi } = this.props;
    const token = localStorage.getItem('token');
    getQuestionsApi(token);
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

  embaralhar(array) {
    var indice_atual = array.length,
      valor_temporario,
      indice_aleatorio;
    while (0 !== indice_atual) {
      indice_aleatorio = Math.floor(Math.random() * indice_atual);
      indice_atual -= 1;
      valor_temporario = array[indice_atual];
      array[indice_atual] = array[indice_aleatorio];
      array[indice_aleatorio] = valor_temporario;
    }
    return array;
  }

  renderQuestions() {
    const { position } = this.state;
    const { questions } = this.props;
    const correctResp = questions[position].correct_answer;
    const respostas = this.embaralhar([
      ...questions[position].incorrect_answers,
      questions[position].correct_answer,
    ]);
    if (questions[position].type === 'multiple') {
    }
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{questions[position].category}</h3>
          <p data-testid="question-text">{questions[position].question}</p>
        </div>
        {questions[position].type === 'multiple'
          ? 'aqui vai um map'
          : respostas.map((alternativa, index) =>
              alternativa === correctResp ? (
                <button key={index} type="button" data-testid="correct-answer">
                  Correta
                </button>
              ) : (
                <button key={index} type="button" data-testid="wrong-answer-index">
                  Incorreta
                </button>
              ),
            )}
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
  getQuestionsApi: (token) => dispatch(getQuestionsApi(token)),
});

GameScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
