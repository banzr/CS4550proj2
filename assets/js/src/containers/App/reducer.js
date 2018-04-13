import { createReducer } from "../../utils/redux";
import { UPDATE } from "./actions";

const initialState = {
  sessions: [
    { game: { id: 0 }, player: { id: 0 }, score: 500 },
    { game: { id: 0 }, player: { id: 2 }, score: 400 },
    { game: { id: 2 }, player: { id: 3 }, score: 700 },
    { game: { id: 3 }, player: { id: 1 }, score: 600 }
  ]
};

export default createReducer(initialState, {
  [UPDATE]: (state, { sessions = [] }) => state //({ ...state, sessions })
});
