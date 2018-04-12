import { makeActionCreator } from "../../utils/redux";

// action type names, qualified by container name to ensure uniqueness
export const INCREMENT = "App/increment";
export const DECREMENT = "App/decrement";

// create actions with type and names for argument(s)
export const increment = makeActionCreator(INCREMENT, "increase");
export const decrement = makeActionCreator(DECREMENT, "decrease");
