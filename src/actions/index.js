import questionsApi from '../services/questionsApi';

// ---------------------- nextQuestionActions --------------------------
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const setNextQuestion = () => ({
  type: NEXT_QUESTION,
});

// ---------------------- auxActions --------------------------
export const SET_ISDISABLED = 'SET_ISDISABLED';

export const setIsDisabled = () => ({
  type: SET_ISDISABLED,
});

// ---------------------- questionsActions --------------------------
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';

const questionsSuccess = (questions) => ({
  type: QUESTIONS_SUCCESS,
  questions,
});

export const getQuestionsApi = (token) => (dispatch) =>
  questionsApi(token)
    .then((questions) => dispatch(questionsSuccess(questions.results)))
    .catch((error) => {
      console.error(error);
    });
