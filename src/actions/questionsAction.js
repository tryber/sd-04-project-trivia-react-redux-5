import questionsApi from '../services/questionsApi';

export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';

const questionsRequest = () => ({
  type: QUESTIONS_REQUEST,
});

const questionsSuccess = (questions) => ({
  type: QUESTIONS_SUCCESS,
  questions,
});

export function getQuestionsApi(token) {
  return (dispatch) => {
    dispatch(questionsRequest());

    return questionsApi(token)
      .then((questions) => dispatch(questionsSuccess(questions)))
      .catch((error) => {
        console.error(error);
      });
  };
};
