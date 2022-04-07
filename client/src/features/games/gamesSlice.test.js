import gamesReducer, { selectQueue, selectInPlay } from "./gamesSlice";

const testGame = { id: 1, name: "Test Game" };

describe("Game reducer actions - games", () => {
  it("Adds a game to queue when queueGame", () => {
    const action = { type: "game/queueGame", payload: testGame };

    const newState = gamesReducer(undefined, action);

    expect(newState.queue[newState.queue.length - 1]).toEqual(testGame);
  });

  it("Moves first game in queue to inPlay when gameOn when valid", () => {
    const initialState = {
      sessionStatus: { courts: 1 },
      queue: [{ id: "Game A" }, { id: "Game B" }],
      inPlay: [],
    };
    const action = { type: "game/gameOn" };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay[0].id).toEqual(initialState.queue[0].id);
    expect(newState.queue[0].id).not.toEqual(initialState.queue[0].id);
  });

  it("Game remains inPlay whilst awaiting promise", () => {
    const initialState = { inPlay: [testGame] };
    const action = { type: "game/gameOver/pending" };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay).toContain(testGame);
  });

  it("Removes game from in play when promise fulfilled", () => {
    const initialState = { inPlay: [testGame] };
    const action = { type: "game/gameOver/fulfilled", payload: testGame.id };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay).not.toContain(testGame);
  });

  it("Moves game from inPlay to pendingUpload on promise rejection", () => {
    const initialState = { inPlay: [testGame], pendingUpload: [] };
    const action = { type: "game/gameOver/rejected", payload: testGame.id };

    const newState = gamesReducer(initialState, action);

    expect(newState.inPlay).not.toContain(testGame);
    expect(newState.pendingUpload).toContain(testGame);
  });
});

describe("Games selectors", () => {
  const mockState = {
    game: {
      queue: ["queueTest"],
      inPlay: ["inPlayTest"],
      pendingUpload: ["pendingTest"],
    },
  };

  it("Returns the game queue", () => {
    const data = selectQueue(mockState);

    expect(data).toEqual(mockState.game.queue);
  });

  it("Returns the inPlay array", () => {
    const data = selectInPlay(mockState);

    expect(data).toEqual(mockState.game.inPlay);
  });
});
