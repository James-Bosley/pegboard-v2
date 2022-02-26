const gamesActions = {
  loadVenueInfo: () => {
    return { type: 'games/loadVenueInfo' };
  },
  editVenueInfo: (data) => {
    return { type: 'games/editVenueInfo', payload: data }; 
  },
  createVenue: (data) => {
    return { type: 'games/createVenue', payload: data };
  },
  queueGame: (data) => {
    return { type: 'games/queueGame', payload: data };
  },
  gameOn: () => {
    return { type: 'games/gameOn' };
  },
  gameOver: (data) => {
    return { type: 'games/gameOver', payload: data };
  }
};

export default gamesActions;
