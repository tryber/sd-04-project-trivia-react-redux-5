import questionsApi from '../services/questionsApi';

// ---------------------- questionsActions --------------------------
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';

// const questionsRequest = () => ({
//   type: QUESTIONS_REQUEST,
// });

const questionsSuccess = (questions) => ({
  type: QUESTIONS_SUCCESS,
  questions,
});

export const getQuestionsApi = (token) => (dispatch) =>
  // dispatch(questionsRequest());
  questionsApi(token)
    .then((questions) => dispatch(questionsSuccess(questions.results)))
    .catch((error) => {
      console.error(error);
    });
