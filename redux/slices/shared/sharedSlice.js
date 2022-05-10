// Main Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
  showCartCanvas: false,
};

const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    triggerCartCanvas: (state) => {
      state.showCartCanvas = !state.showCartCanvas;
    },
  },
});

export const { setLang, triggerCartCanvas } = sharedSlice.actions;

export default sharedSlice.reducer;
