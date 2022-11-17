import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherSlice";
import locationReducer from "./reducers/locationSlice";
import searchReducer from "./reducers/searchSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    locations: locationReducer,
    searchData: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
