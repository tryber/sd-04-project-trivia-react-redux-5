export const INITIAL_STORAGE_STATE = { name: '', gravatarEmail: '', score: 0, assertions: 0 };

export const createPlayerInLocalStorage = (name, gravatarEmail) => {
  const player = { ...INITIAL_STORAGE_STATE, gravatarEmail, name };
  localStorage.setItem('state', JSON.stringify({ player }));
};
