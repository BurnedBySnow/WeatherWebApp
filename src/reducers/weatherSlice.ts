import { createSlice } from "@reduxjs/toolkit";
import { WeatherData, WeatherObject } from "../types";

const initialState: WeatherObject[] = [];

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addWeather: (state, action) => {
      state.push(action.payload);
    },
    removeWeather: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateWeather: (state: WeatherObject[], action) => {
      return action.payload;
    },
  },
});

export const { addWeather, removeWeather, updateWeather } =
  weatherSlice.actions;

export default weatherSlice.reducer;
