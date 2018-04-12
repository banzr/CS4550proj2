import { createSelector } from "reselect";

// select the app section of the state
const selectApp = () => state => state.app;

// create selectors for specific data within the app section of the state
export const makeSelectPlaceholder = () =>
  createSelector(selectApp(), appState => appState.placeholder);
