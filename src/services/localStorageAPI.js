export const INITIAL_STORAGE_STATE = {
  player: { name: '', gravatarEmail: '' },
};

export const createPlayerInLocalStorage = (name, gravatarEmail) => {
  const player = { ...INITIAL_STORAGE_STATE.player, gravatarEmail, name };
  localStorage.setItem('state', JSON.stringify({ player }));
};
