import gravatarApi from '../services/gravatarApi';
import questionsApi from '../services/questionsApi';

export const GRAVATAR_REQUEST = 'GRAVATAR_REQUEST';
export const GRAVATAR_SUCCESS = 'GRAVATAR_SUCCESS';

const gravatarRequest = () => ({
  type: GRAVATAR_REQUEST,
});

const gravatarSuccess = (picture) => ({
  type: GRAVATAR_SUCCESS,
  picture,
});

export function getGravatarApi(hash) {
  return (dispatch) => {
    dispatch(gravatarRequest());

    return gravatarApi(hash)
      .then((picture) => dispatch(gravatarSuccess(picture)))
      .catch((error) => {
        console.error(error);
      });
  };
}

// ---------------------- questionsActions --------------------------
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
      .then((questions) => dispatch(questionsSuccess(questions.results)))
      .catch((error) => {
        console.error(error);
      });
  };
}

