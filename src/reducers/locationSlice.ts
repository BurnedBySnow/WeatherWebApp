import { createSlice } from "@reduxjs/toolkit";
import { Location } from "../types";

const initialState: Location[] = [];

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (state: Location[], action) => {
      state.push(action.payload);
    },
    removeLocation: (state: Location[], action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    setLocations: (state: Location[], action) => {
      return action.payload;
    },
  },
});

export const { addLocation, removeLocation, setLocations } =
  locationSlice.actions;

export default locationSlice.reducer;
