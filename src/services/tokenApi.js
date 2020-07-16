const tokenApi = () =>
  fetch('https://opentdb.com/api_token.php?command=request').then((response) =>
    response
      .json()
      .then((token) =>
        (response.ok ? Promise.resolve(token) : Promise.reject(token)),
      ),
  );

export default tokenApi;
