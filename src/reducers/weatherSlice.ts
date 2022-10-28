import { createSlice } from "@reduxjs/toolkit";
import { ApiWeather, WeatherData } from "../types";

const initialState: Array<{ id: string; weather: WeatherData[] }> = [];

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
  },
});

export const { addWeather, removeWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
