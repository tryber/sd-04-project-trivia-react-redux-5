export const getToken = async () => {
  const response = await fetch(
    'https://opentdb.com/api_token.php?command=request'
  );
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};
