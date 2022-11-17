import "./Weather.scss";
import Navbar from "./Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWeather,
  removeWeather,
  updateWeather,
} from "../reducers/weatherSlice";
import { RootState } from "../store";
import Info from "./Info/Info";
import getLocations from "../api/getLocations";
import {
  addLocation,
  removeLocation,
  setLocations,
} from "../reducers/locationSlice";
import _ from "lodash";
import debounce, { DebounceOptions } from "debounce-promise";
import { Location, ApiWeather, WeatherData, WeatherType } from "../types";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";
import { updateWeatherData } from "../utils/updateWeatherData";
import { setSearchData } from "../reducers/searchSlice";
import { addWeatherData } from "../utils/addWeatherData";

const Weather = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const locations = useSelector((state: RootState) => state.locations);
  const dispatch = useDispatch();

  const wait = 250; // milliseconds
  const loadOptions = (inputValue: string) => getAsyncOptions(inputValue);
  const debouncedLoadOptions = debounce(loadOptions, wait, {
    leading: false,
  });

  const getAsyncOptions = async (inputValue: string) => {
    setShowDropdown(true);
    const locationData = await getLocations(inputValue);
    const arr: Location[] = locationData.features.map((item) => {
      return {
        id: nanoid(),
        name: item.properties.display_name,
        category: item.properties.category,
        type: item.properties.type,
        latitude: +item.geometry.coordinates[1],
        longitude: +item.geometry.coordinates[0],
      };
    });
    dispatch(setSearchData(arr));
  };

  const changeSearch = (value: string) => {
    debouncedLoadOptions(value);
  };

  const removeCard = (id: string) => {
    dispatch(removeLocation(id));
    dispatch(removeWeather(id));
  };

  const handleUpdate = () => {
    const arr = updateWeatherData(locations);
    dispatch(updateWeather(arr));
  };

  useEffect(() => {
    const locationsStorage: Location[] = JSON.parse(
      localStorage.getItem("locations") || "{}"
    );
    if (locationsStorage.length > 0) {
      dispatch(setLocations(locationsStorage));
      locationsStorage.forEach((item) => {
        addWeatherData(item.latitude, item.longitude, item.id);
      });
    }
  }, []);

  useEffect(() => {
    if (locations?.length)
      localStorage.setItem("locations", JSON.stringify(locations));
    if (locations.length === 0 || locations.length === null)
      localStorage.removeItem("locations");
  }, [locations]);

  return (
    <div className="weather">
      <Navbar
        changeSearch={changeSearch}
        setShowDropdown={(b: boolean) => setShowDropdown(b)}
        showDropdown={showDropdown}
      />

      <div className="main-page">
        <div id="cards">
          <AnimatePresence initial={false}>
            {locations.length > 0 &&
              locations.map((location) => {
                return (
                  <Info
                    location={location}
                    key={location.id}
                    removeCard={removeCard}
                  />
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Weather;
