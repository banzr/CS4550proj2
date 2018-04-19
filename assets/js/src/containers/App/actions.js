import { makeActionCreator } from "../../utils/redux";

// action type names, qualified by container name to ensure uniqueness
export const INCREMENT = "App/increment";
export const DECREMENT = "App/decrement";
export const UPDATE = "App/update";

// create actions with type and names for argument(s)
export const increment = makeActionCreator(INCREMENT, "increase");
export const decrement = makeActionCreator(DECREMENT, "decrease");
export const update = makeActionCreator(UPDATE, "payload");
