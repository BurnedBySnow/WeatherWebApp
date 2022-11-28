import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../reducers/locationSlice";
import { setSearchData } from "../reducers/searchSlice";
import { RootState, store } from "../store";
import { Location } from "../types";
import { addWeatherData } from "./addWeatherData";

export const addLocationCard = async (item: Location) => {
  const temp = store.getState().locations;

  const location: Location = {
    id: item.id,
    name: item.name,
    category: item.category,
    type: item.type,
    latitude: item.latitude,
    longitude: item.longitude,
  };
  temp.forEach((obj) => {
    if (location.id === obj.id) {
      location.id = nanoid();
    }
  });
  store.dispatch(addLocation(location));

  addWeatherData(location.latitude, location.longitude, location.id);
  store.dispatch(setSearchData([]));
};
