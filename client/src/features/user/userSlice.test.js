import userReducer, { selectUser, selectUserStatus } from "./userSlice";

describe("User reducer actions", () => {
  const testUser = {
    first_name: "Test",
    last_name: "User",
    email_address: "test@email.com",
  };
  const loggedInInitial = {
    user: testUser,
    loggedInStatus: { loggedIn: true, message: null },
  };

  it("Logs pending message whilst awaiting promise", () => {
    const action = { type: "user/logIn/pending" };

    const newState = userReducer(undefined, action);

    expect(newState.loggedInStatus.message).toEqual("Loading");
  });

  it("Adds user to state and changes status when promise is fulfilled", () => {
    const action = { type: "user/logIn/fulfilled", payload: testUser };

    const newState = userReducer(undefined, action);

    expect(newState.user).toEqual(testUser);
    expect(newState.loggedInStatus.loggedIn).toBeTruthy();
  });

  it("Logs failure message when promise rejects", () => {
    const action = { type: "user/logIn/rejected" };

    const newState = userReducer(undefined, action);

    expect(newState.loggedInStatus.message).toEqual("Authorization Failed");
  });

  it("Removes the user and changes status when logOut is dispatched", () => {
    const action = { type: "user/logOut" };

    const newState = userReducer(loggedInInitial, action);

    expect(newState.user).toEqual(null);
    expect(newState.loggedInStatus.loggedIn).toBeFalsy();
  });
});

describe("User selectors", () => {
  const mockState = {
    user: { user: "Test User" },
    loggedInStatus: { loggedIn: true, message: "Msg" },
  };

  it("Returns the state of user", () => {
    const data = selectUser(mockState);

    expect(data).toEqual(mockState.user.user);
  });

  it("Returns the loggedInStatus", () => {
    const data = selectUserStatus(mockState);

    expect(data).toEqual(mockState.user.loggedInStatus);
  });
});
