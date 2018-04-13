import { makeActionCreator } from "../../utils/redux";

// action type names, qualified by container name to ensure uniqueness
export const SET_LOADED = "User/setLoaded";
export const SET_PROFILE = "User/setProfile";

// create actions with type and names for argument(s)
export const setLoaded = makeActionCreator(SET_LOADED, "loaded");
export const setProfile = makeActionCreator(SET_PROFILE, "profile");
