import { createSelector } from "reselect";

// select the app section of the state
export const selectApp = state => state.app;

// create selectors for specific data within the app section of the state
export const selectPlaceholder = createSelector(
  selectApp,
  appState => appState.placeholder
);

export const selectSessions = createSelector(
  selectApp,
  appState => appState.sessions
);

export const selectHighscorePlayers = createSelector(
  selectApp,
  appState => appState.highscorePlayers
);

export const selectLogin = createSelector(
  selectApp,
  appState => appState.loginName
);
