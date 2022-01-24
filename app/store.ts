import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../shared/slices";

const store = configureStore({
  reducer: rootReducer,
  // middleware:,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
