import { createReducer } from "../../utils/redux";
import { SET_LOADED, SET_PROFILE } from "./actions";

// placeholder state and actions for example purposes, to be filled in later
const initialState = {};

export default createReducer(initialState, {
  [SET_LOADED]: (state, { loaded }) => ({ ...state, loaded }),
  [SET_PROFILE]: (state, { profile }) => ({ ...state, profile })
});
