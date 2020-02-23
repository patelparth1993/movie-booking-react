import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import combinedReducers from "./Reducers/combinedReducer";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    else return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

export const appStore = applyMiddleware(thunk)(createStore)(
  combinedReducers,
  // persistedState,
  window.devToolsExtension && window.devToolsExtension()
);

appStore.subscribe(() => saveToLocalStorage(appStore.getState()));
