import React from "react";
import Home from "../../components/Home";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ContentState {
  content: React.ReactElement;
}

const initialState: ContentState = {
  content: <Home />,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<React.ReactElement>) => {
      state.content = action.payload;
    },
  },
});

export const { setContent } = contentSlice.actions;
export default contentSlice.reducer;
