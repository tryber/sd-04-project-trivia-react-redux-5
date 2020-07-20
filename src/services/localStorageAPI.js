export const INITIAL_STORAGE_STATE = { player: { name: '', assertions: 0, score: 0, userImagem: '' } };

export const createPlayerInLocalStorage = (name, userImagem) => {
  const player = { ...INITIAL_STORAGE_STATE.player, userImagem, name };
  // console.log(player);
  localStorage.setItem('state', JSON.stringify({ player }));
};
