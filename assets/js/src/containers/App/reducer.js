import { createReducer } from "../../utils/redux";
import { INCREMENT, DECREMENT } from "./actions";

// placeholder state and actions for example purposes, to be filled in later
const initialState = {
  placeholder: 0,
  // TODO: replace sample data with real data, loadead & kept synced via websockets
  sessions: [
    { game: { id: 0 }, player: { id: 0 }, score: 100 },
    { game: { id: 0 }, player: { id: 1 }, score: 200 },
    { game: { id: 1 }, player: { id: 1 }, score: 300 },
    { game: { id: 2 }, player: { id: 2 }, score: 400 }
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
  }
});
