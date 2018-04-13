import { createReducer } from "../../utils/redux";
import { getAccessToken } from "../../utils/amazon";
import { LOGIN, SET_TOKEN } from "./actions";

const initialState = {};

export default createReducer(initialState, {
  [LOGIN]: (state, { onLogin }) => {
    getAccessToken(onLogin);
    return state;
  },
  [SET_TOKEN]: (state, { token }) => ({ ...state, token })
});
