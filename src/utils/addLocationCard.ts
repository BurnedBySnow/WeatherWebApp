import { useDispatch } from "react-redux";
import { addLocation } from "../reducers/locationSlice";
import { setSearchData } from "../reducers/searchSlice";
import { store } from "../store";
import { Location } from "../types";
import { addWeatherData } from "./addWeatherData";

export const addLocationCard = async (item: Location) => {
  const location: Location = {
    id: item.id,
    name: item.name,
    category: item.category,
    type: item.type,
    latitude: item.latitude,
    longitude: item.longitude,
  };
  store.dispatch(addLocation(location));

  addWeatherData(location.latitude, location.longitude, location.id);
  store.dispatch(setSearchData([]));
};
