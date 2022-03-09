import playerReducer, { selectPlayers } from "./playerSlice";

const testPlayer = { name: "Test Player", id: 1 };

describe("Player reducer actions", () => {
  it("Adds a player to the players array when addPlayer", () => {
    const action = { type: "player/addPlayer", payload: testPlayer };

    const newState = playerReducer(undefined, action);

    expect(newState.players).toContain(testPlayer);
  });

  it("Removes the correct player when removePlayer", () => {
    const initialState = { players: [{ id: 3 }, testPlayer] };
    const action = { type: "player/removePlayer", payload: testPlayer };

    const newState = playerReducer(initialState, action);

    expect(newState.players).not.toContain(testPlayer);
    expect(newState.players).toContainEqual({ id: 3 });
  });
});

describe("Player selectors", () => {
  const mockState = {
    player: { players: [{ name: "Other Test", id: 2 }, testPlayer] },
  };

  it("Returns players array", () => {
    const data = selectPlayers(mockState);

    expect(data).toEqual(mockState.player.players);
  });
});
