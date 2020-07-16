const questionsApi = token => {
  return fetch(
    `https://opentdb.com/api.php?amount=5&token=${token}`
  ).then((response) =>
    response
      .json()
      .then((questions) =>
        (response.ok ? Promise.resolve(questions) : Promise.reject(questions)),
      ),
  );
};

export default questionsApi;
