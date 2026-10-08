import { createSlice } from "@reduxjs/toolkit";

/* Logged-in user ki id (sessionStorage pehle, phir localStorage) */
export const getUserId = () => {
  try {
    const direct = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    if (direct) return direct;
    const raw = sessionStorage.getItem("user") || localStorage.getItem("user");
    return raw ? JSON.parse(raw)?.id || null : null;
  } catch {
    return null;
  }
};

/* Har user ki shortlist alag key mein: shortlist_<userId> */
const keyFor = (userId) => `shortlist_${userId}`;

export const loadItems = (userId) => {
  if (!userId) return [];
  try {
    return JSON.parse(localStorage.getItem(keyFor(userId))) || [];
  } catch {
    return [];
  }
};

export const saveItems = (userId, items) => {
  try {
    localStorage.setItem(keyFor(userId), JSON.stringify(items));
  } catch {}
};

const userId = getUserId();

const shortlistSlice = createSlice({
  name: "shortlist",
  initialState: { userId, items: loadItems(userId) },
  reducers: {
    /* Add ya remove (toggle) */
    toggleShortlist(state, { payload: venue }) {
      if (!state.userId) return; // login nahi hai
      const i = state.items.findIndex((v) => v.id === venue.id);
      if (i >= 0) state.items.splice(i, 1);
      else state.items.push(venue);
    },
    removeShortlist(state, { payload: id }) {
      state.items = state.items.filter((v) => v.id !== id);
    },
    clearShortlist(state) {
      state.items = [];
    },
  },
});

export const { toggleShortlist, removeShortlist, clearShortlist } = shortlistSlice.actions;
export default shortlistSlice.reducer;
