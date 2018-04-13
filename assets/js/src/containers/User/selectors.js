import { createSelector } from "reselect";
import { selectSessions } from "../App/selectors";

export const selectUserSessions = createSelector(
  selectSessions,
  (_, userId) => userId,
  (sessions, userId) =>
    sessions.filter(({ player: { id: playerId } }) => playerId == userId)
);

export const selectUser = state => state.user;

export const selectProfile = createSelector(
  selectUser,
  userState => userState.profile
);

export const selectLoaded = createSelector(
  selectUser,
  userState => userState.loaded
);
