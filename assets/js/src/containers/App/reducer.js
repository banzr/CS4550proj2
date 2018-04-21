import { createReducer } from "../../utils/redux";
import { SET_PROFILE, UPDATE } from "./actions";

const initialState = {
  sessions: [
    {
      game: { id: 0 },
      player: { id: 0 },
      score: 500,
      answers: ["answer 1", "answer 2"],
      clues: [
        { question: "question 1", answer: "correct answer 1" },
        { question: "question 2", answer: "correct answer 2" }
      ]
    },
    { game: { id: 0 }, player: { id: 2 }, score: 400 },
    { game: { id: 2 }, player: { id: 3 }, score: 700 },
    { game: { id: 3 }, player: { id: 1 }, score: 600 }
  ]
};

export default createReducer(initialState, {
  [SET_PROFILE]: (state, { profile }) => ({ ...state, profile }),
  [UPDATE]: (state, { payload: { sessions = [] } }) => state //({ ...state, sessions })
});
