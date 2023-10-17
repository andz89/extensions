import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";

import foodsReducer from "../features/foods/foodsSlice";
import toolsReducer from "../features/tools/toolsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    foods: foodsReducer,
    tools: toolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
