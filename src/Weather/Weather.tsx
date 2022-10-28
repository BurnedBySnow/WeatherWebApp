import "./Weather.scss";
import Navbar from "./Navbar/Navbar";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWeather } from "../reducers/weatherSlice";
import { RootState } from "../store";
import Info from "./Info/Info";
import useWeather from "../api/getWeather";
import Dropdown from "./Dropdown/Dropdown";
import getLocations from "../api/getLocations";
import { addLocation, removeLocation } from "../reducers/locationSlice";
import _ from "lodash";
import debounce, { DebounceOptions } from "debounce-promise";
import {
  ApiLocation,
  Location,
  ApiWeather,
  WeatherData,
  UserLocation,
} from "../types";
import getUserLocation from "../api/getUserLocation";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal/Modal";
import getWeather from "../api/getWeather";

const Weather = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dropdownData, setDropdownData] = useState<Location[]>([]);

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
    setDropdownData(arr);
  };

  const changeSearch = (value: string) => {
    debouncedLoadOptions(value);
  };

  const addLocationCard = async (item: {
    id: string;
    name: string;
    category: string;
    type: string;
    latitude: number;
    longitude: number;
  }) => {
    const location: Location = {
      id: item.id,
      name: item.name,
      category: item.category,
      type: item.type,
      latitude: item.latitude,
      longitude: item.longitude,
    };
    dispatch(addLocation(location));

    const weatherData = await getWeather(location.latitude, location.longitude);
  };

  const removeCard = (id: string) => {
    dispatch(removeLocation(id));
  };

  return (
    <div className="weather">
      <Navbar
        changeSearch={changeSearch}
        setShowDropdown={(b: boolean) => setShowDropdown(b)}
      />
      {showDropdown && (
        <Dropdown
          setShowDropdown={(b: boolean) => setShowDropdown(b)}
          addLocationCard={addLocationCard}
          dropdownData={dropdownData}
        />
      )}
      <div className="main-page">
        <div id="cards">
          <AnimatePresence initial={false}>
            {locations.map((location) => {
              return (
                <Info
                  location={location}
                  key={location.id}
                  removeCard={removeCard}
                  setShowModal={(b: boolean) => setShowModal(b)}
                />
              );
            })}
          </AnimatePresence>
        </div>
        {showModal && <Modal setShowModal={(b: boolean) => setShowModal(b)} />}
      </div>
    </div>
  );
};

export default Weather;
