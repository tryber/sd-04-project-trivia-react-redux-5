import { questionsRequest, questionsSuccess } from '../actions/index';

export function questionsApi(token) {
  return (dispatch) => {
    dispatch(questionsRequest());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((questions) => dispatch(questionsSuccess(questions.results)));
  };
}
