import { makeActionCreator } from "../../utils/redux";

// action type names, qualified by container name to ensure uniqueness
export const UPDATE = "App/update";

// create actions with type and names for argument(s)
export const update = makeActionCreator(UPDATE, "payload");
