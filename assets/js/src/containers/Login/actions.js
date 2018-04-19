import { makeActionCreator } from "../../utils/redux";

// action type names, qualified by container name to ensure uniqueness
export const LOGIN = "Login/login";

// create actions with type and names for argument(s)
export const login = makeActionCreator(LOGIN);
