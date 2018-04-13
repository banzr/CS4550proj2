import { createReducer } from "../../utils/redux";
import { UPDATE } from "./actions";

const initialState = {
  sessions: []
};

export default createReducer(initialState, {
  // handle action by returning new state object
  [UPDATE]: (state, { payload }) => ({
    ...state,
    sessions: payload
  })
});
