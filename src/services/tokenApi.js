export const tokenApi = () =>
  fetch('https://opentdb.com/api_token.php?command=request').then((response) =>
    response.json().then(function (json) {
      return response.ok ? Promise.resolve(json) : Promise.reject(json);
    }),
  );
