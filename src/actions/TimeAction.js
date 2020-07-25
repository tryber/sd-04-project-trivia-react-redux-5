export const DECREMENT_TIMER = "INCREMENT_TIMER";
export const TIMER_CONFIG = "TIMER_CONFIG";

export const timeCount = () => ({
  type: DECREMENT_TIMER,
});

export const setTimer = () => ({
  type: TIMER_CONFIG,
});
