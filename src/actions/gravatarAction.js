import gravatarApi from '../services/gravatarApi';

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
