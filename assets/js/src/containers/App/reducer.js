import { createReducer } from "../../utils/redux";
import { INCREMENT, DECREMENT, UPDATE } from "./actions";

// placeholder state and actions for example purposes, to be filled in later
const initialState = {
  placeholder: 0,
  // TODO: replace sample data with real data, loadead & kept synced via websockets
  sessions: [
  ]
};

export default createReducer(initialState, {
  // example action handlers
  [INCREMENT]: (state, { increase }) => {
    console.log("increment action fired with ", increase);
    const current = state.placeholder;
    // don't mutate state, return new state
    return { ...state, placeholder: current + increase };
  },
  [DECREMENT]: (state, { decrease }) => {
    console.log("decrement action fired with ", decrease);
    const current = state.placeholder;
    // don't mutate state, return new state
    return { ...state, placeholder: current - decrease };
  },
[UPDATE]: (state, { payload }) => {
    console.log("update action fired with ", payload);
      const current = state.placeholder;
    return { ...state, sessions : payload  };

}});
