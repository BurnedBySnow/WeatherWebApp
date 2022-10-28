import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherSlice";
import locationReducer from "./reducers/locationSlice";

export const store = configureStore({
  reducer: { weather: weatherReducer, locations: locationReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
