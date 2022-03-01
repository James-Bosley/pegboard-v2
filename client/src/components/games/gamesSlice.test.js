import gamesReducer, { selectVenue, selectVenueStatus, selectQueue, selectInPlay } from "./gamesSlice";

const testVenue = { name: 'Test Venue' };
const testGame = { id: 1, name: 'Test Game' };

describe('Game reducer actions - venue', () => {

  it('Logs pending message whilst awaiting promise', () => {

    const action = { type: 'game/loadVenue/pending' };

    const newState = gamesReducer(undefined, action);

    expect(newState.venueStatus.message).toEqual('Loading');
  });

  it('Adds venue to state and changes status when promise fulfilled', () => {

    const action = { type: 'game/loadVenue/fulfilled', payload: testVenue };

    const newState = gamesReducer(undefined, action);

    expect(newState.venue).toEqual(testVenue);
    expect(newState.venueStatus.loggedIn).toBeTruthy();
  });

  it('Logs failure message when promise rejects', () => {

    const action = { type: 'game/loadVenue/rejected' };

    const newState = gamesReducer(undefined, action);

    expect(newState.venueStatus.message).toEqual('Authorization Failed');
  });

  it('Removes venue and resets queue and inPlay when removeVenue', () => {

    const initialState = { venue: testVenue, venueStatus: { loggedIn: true }, queue: [testGame], inPlay: [testGame], pendingUpload: [testGame] };
    const action = { type: 'game/removeVenue' };

    const newState = gamesReducer(initialState, action);

    expect(newState.venue).toBeNull();
    expect(newState.venueStatus.loggedIn).toBeFalsy();
    expect(newState.queue).toHaveLength(0);
    expect(newState.inPlay).toHaveLength(0);
    expect(newState.pendingUpload).toEqual(initialState.pendingUpload);
  });
});

describe('Game reducer actions - games', () => {

  it('Adds a game to queue when queueGame', () => {

    const action = { type: 'game/queueGame', payload: testGame };

    const newState = gamesReducer(undefined, action);

    expect(newState.queue[newState.queue.length - 1]).toEqual(testGame);
  });

  it('Moves first game in queue to inPlay when gameOn when valid', () => {

    const initialState = { venue: { maxCourts: 1 }, queue: ['Game A', 'Game B'], inPlay: [] };
    const action = { type: 'game/gameOn' };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay).toContain(initialState.queue[0]);
    expect(newState.queue).not.toContain(initialState.queue[0]);
  });

  it('Game remains inPlay whilst awaiting promise', () => {

    const initialState= { inPlay: [testGame] };
    const action = { type: 'game/gameOver/pending' };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay).toContain(testGame);
  });

  it('Removes game from in play when promise fulfilled', () => {

    const initialState= { inPlay: [testGame] };
    const action = { type: 'game/gameOver/fulfilled', payload: testGame };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay).not.toContain(testGame);
  });

  it('Moves game from inPlay to pendingUpload on promise rejection', () => {

    const initialState= { inPlay: [testGame], pendingUpload: [] };
    const action = { type: 'game/gameOver/rejected', payload: testGame };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay).not.toContain(testGame);
    expect(newState.pendingUpload).toContain(testGame);
  });
});

describe('Games selectors', () => {

  const mockState = { game: { venue: testVenue, venueStatus: { loggedIn: true, message: 'Msg' }, queue: ['queueTest'], inPlay: ['inPlayTest'], pendingUpload: ['pendingTest'] }};
  
  it('Returns the venue', () => {

    const data = selectVenue(mockState);

    expect(data).toEqual(mockState.game.venue);
  });

  it('Returns the venueStatus', () => {

    const data = selectVenueStatus(mockState);

    expect(data).toEqual(mockState.game.venueStatus);
  });

  it('Returns the game queue', () => {

    const data = selectQueue(mockState);

    expect(data).toEqual(mockState.game.queue);
  });

  it('Returns the inPlay array', () => {

    const data = selectInPlay(mockState);

    expect(data).toEqual(mockState.game.inPlay);
  });
});
