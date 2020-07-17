// ---------------------- questionsActions --------------------------
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';

// const questionsRequest = () => ({
//   type: QUESTIONS_REQUEST,
// });

// const questionsSuccess = (questions) => ({
//   type: QUESTIONS_SUCCESS,
//   questions,
// });

// -------------------------userActions-------------------------------

export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';

export const getName = (name) => ({
  type: GET_NAME,
  payload: name,
});

export const getEmail = (email, hash) => ({
  type: GET_EMAIL,
  payload: {
    email,
    hash,
  },
});
