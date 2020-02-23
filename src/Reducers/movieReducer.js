import { act } from "react-dom/test-utils";

var actionTypes = require("./../Actions/ActionTypes");

const initMovies = {};

export default function movieReducer(state = initMovies, { type, payload }) {
  switch (type) {
    case actionTypes.MOVIES:
      return {
        ...state,
        theaters: payload
      };

    default:
      return { ...state };
  }
}
