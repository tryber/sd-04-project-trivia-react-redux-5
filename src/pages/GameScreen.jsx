import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestionsApi } from '../actions';

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
    return array;
  }

  constructor(props) {
    super(props);
    this.state = {
      quantidade: 4,
      position: 0,
      isDisabled: true,
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
    });
  }



  carregaBotoes(respostas, correct) {
    return respostas.map((alternativa) =>
      alternativa === correct ? (
        <button
          key={alternativa}
          type='button'
          data-testid='correct-answer'
          onClick={() => this.enableButtons()}
          disabled={!this.state.isDisabled}
        >
          {alternativa}
        </button>
      ) : (
        <button
          key={alternativa}
          type='button'
          data-testid='wrong-answer-index'
          onClick={() => this.enableButtons()}
          disabled={!this.state.isDisabled}
        >
          {alternativa}
        </button>
      )
    );
  }

  nextQuestion() {
    const { quantidade, position } = this.state;
    this.setState({ quantidade: quantidade - 1, position: position + 1, isDisabled: true });
  }

  // embaralhaPerguntas(certa, erradas) {
  //   const embaralhadas = [...Array(erradas.length + 1).fill('')];
  //   embaralhadas[parseInt(Math.random() * 5)] = certa;
  //   embaralhadas.forEach((pergunta) => {
  //     if (pergunta === '')
  //   });
  // }

  renderQuestions() {
    const { position, isDisabled } = this.state;
    const { questions } = this.props;
    const correctResp = questions[position].correct_answer;
    const respostas = GameScreen.embaralhar([
      ...questions[position].incorrect_answers,
      correctResp,
    ]);
    return (
      <div>
        <div>
          <h3 data-testid='question-category'>
            {questions[position].category}
          </h3>
          <p data-testid='question-text'>{questions[position].question}</p>
        </div>
        {this.carregaBotoes(respostas, correctResp)}
        <button
          data-testid='btn-next'
          type='button'
          onClick={this.nextQuestion}
          disabled={isDisabled}
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { quantidade } = this.state;
    const { isFetching } = this.props;

    if (isFetching) return <div>Loading...</div>;

    if (!quantidade) return <Redirect to='/Feedback' />;

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
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
