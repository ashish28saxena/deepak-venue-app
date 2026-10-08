import { configureStore } from "@reduxjs/toolkit";
import shortlistReducer, { saveItems } from "./shortlistSlice";

export const store = configureStore({
  reducer: {
    shortlist: shortlistReducer,
  },
});

/* Shortlist badalte hi us user ki key mein localStorage mein save ho jaye */
store.subscribe(() => {
  const { userId, items } = store.getState().shortlist;
  if (userId) saveItems(userId, items);
});
