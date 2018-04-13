import { createReducer } from "../../utils/redux";
import { LOGIN, SET_TOKEN } from "./actions";

// placeholder state and actions for example purposes, to be filled in later
const initialState = {};

export default createReducer(initialState, {
  [LOGIN]: (state, { onLogin }) => {
    amazon.Login.authorize({ scope: "profile" }, response => {
      const { access_token, error } = response;

      if (error) {
        alert("oauth error " + error);
        return;
      }

      onLogin(access_token);
    });
    return state;
  },
  [SET_TOKEN]: (state, { token }) => {
    return { ...state, token };
  }
});
