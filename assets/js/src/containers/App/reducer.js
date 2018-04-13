import { createReducer } from "../../utils/redux";
import { UPDATE } from "./actions";

const initialState = {
  sessions: []
};

export default createReducer(initialState, {
  [UPDATE]: (state, { sessions }) => ({ ...state, sessions })
});
