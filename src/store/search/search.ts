import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { City } from "../../App";

interface SearchState {
  searchResult: City[];
}

const initialState: SearchState = {
  searchResult: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<City[]>) => {
      state.searchResult = action.payload;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
