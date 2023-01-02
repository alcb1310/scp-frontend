import { createStore } from "redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducerFn = (state = {}, action: any = {}) => {
  // syncronous function
  // we should not mutate the original state
  if (action.type === "LOGIN") {
    const tokenData = {
      token: action.payload.token,
      type: action.payload.type,
    };
    return { ...state, ...tokenData };
  }

  if (action.type === "login/status") {
    return { ...state, status: action.payload };
  }

  if (action.type === "users/SetCurrentUser") {
    return { ...state, ...action.payload, status: true };
  }

  if (action.type === "LOGOUT") {
    return {};
  }

  return state;
};

const store = createStore(reducerFn);

export default store;
