const playerActions = {
  addPlayer: (data) => {
    return { type: 'player/addPlayer', payload: data };
  },
  removePlayer: (data) => {
    return { type: 'player/removePlayer', payload: data };
  }
};

export default playerActions;
