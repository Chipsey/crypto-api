import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

const userFromLocalStorage =
  JSON.parse(localStorage.getItem("profile")) || null;

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk],
  preloadedState: {
    auth: {
      authData: userFromLocalStorage,
    },
  },
});

export default store;
