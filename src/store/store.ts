import { configureStore } from "@reduxjs/toolkit";
import content from "./search/content";
import search from "./search/search";
import selectedCity from "./search/selectedCity";

export const store = configureStore({
  reducer: {
    content,
    search,
    selectedCity,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
