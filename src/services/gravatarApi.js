const gravatarApi = (hash) => {
  fetch(`https://www.gravatar.com/avatar/${hash}`).then((response) =>
    response
      .json()
      .then((picture) =>
        (response.ok ? Promise.resolve(picture) : Promise.reject(picture)),
      ),
  );
};

export default gravatarApi;
