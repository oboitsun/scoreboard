export const handleChangeServeState = (state, pair, player) => {
  const otherPairIdx = pair === 1 ? 2 : 1;
  const otherPlayerIdx = player === 1 ? 2 : 1;
  const oldPairState = state?.[`pair${pair}`];
  const oldOtherPairState = state?.[`pair${otherPairIdx}`];

  return {
    [`pair${pair}`]: {
      ...oldPairState,
      [`player${player}`]: { ...oldPairState?.[`player${player}`], serve: true },
      [`player${otherPlayerIdx}`]: { ...oldPairState?.[`player${otherPlayerIdx}`], serve: false },
    },
    [`pair${otherPairIdx}`]: {
      ...oldOtherPairState,
      [`player1`]: { ...oldOtherPairState?.[`player1`], serve: false },
      [`player2`]: { ...oldOtherPairState?.[`player2`], serve: false },
    },
  };
};
export const handleNameChange = (pairState, pair, player, val) => ({
  [`pair${pair}`]: {
    ...pairState,
    [`player${player}`]: { ...pairState?.[`player${player}`], name: val },
  },
});
export const handleFlagChange = (pairState, pair, player, val) => ({
  [`pair${pair}`]: {
    ...pairState,
    [`player${player}`]: { ...pairState?.[`player${player}`], country: val },
  },
});
