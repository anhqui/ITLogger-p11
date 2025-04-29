import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./reducers/logReducer";

const store = configureStore({
  reducer: {
    log: logReducer,
  },
});

export default store;
