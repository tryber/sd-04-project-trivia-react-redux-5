export const apiGravatarRequest = async (hash) => {
  fetch(`https://www.gravatar.com/avatar/${hash}`)
    .then((data) => data.json())
    .catch((err) => console.log('apiGravatarRequest', err))
};

export const fetchToken = async () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json())
    .catch((err) => console.log('fetchToken', err))
);

export const apiQuestionRequest = (token) => {
  fetch(`https://opentdb.com/api.php?amount=${5}&token=${token}`)
    .then((data) => data.json())
    .catch((err) => console.log('apiQuestionRequest', err))
};
