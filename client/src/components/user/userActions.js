const userActions = {
  logIn: (data) => {
    return { type: 'user/logIn', payload: data };
  },
  logOut: () => {
    return { type: 'user/logOut' };
  }
};

export default userActions;
