import { createReducer } from "../../utils/redux";
import { INCREMENT, DECREMENT } from "./actions";

// placeholder state and actions for example purposes, to be filled in later
const initialState = {
  placeholder: 0
};

export default createReducer(initialState, {
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
  }
});
