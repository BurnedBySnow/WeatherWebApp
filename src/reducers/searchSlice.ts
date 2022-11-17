import { createSlice } from "@reduxjs/toolkit";
import { Location } from "../types";

const initialState: Location[] = [];

export const searchSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setSearchData: (state: Location[], action) => {
      return action.payload;
    },
  },
});

export const { setSearchData } = searchSlice.actions;

export default searchSlice.reducer;
