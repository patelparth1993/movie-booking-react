import { combineReducers } from "redux";

import userReducer from "./userReducer";
import movieReducer from "./movieReducer";

const combinedReducers = combineReducers({
  user: userReducer,
  Theaters: movieReducer
});

export default combinedReducers;
