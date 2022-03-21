export const loadState = () => {
  try {
    const serialiszedState = localStorage.getItem("state");
    if (serialiszedState === null) {
      return undefined;
    }
    return JSON.parse(serialiszedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialiszedState = JSON.stringify(state);
    localStorage.setItem("state", serialiszedState);
  } catch (err) {}
};
